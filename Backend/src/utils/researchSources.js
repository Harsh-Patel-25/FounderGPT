/**
 * Research Sources Manager
 * Handles integration with multiple academic research sources
 */

import logger from '../utils/logger.js';
import { XMLParser } from 'fast-xml-parser';
import { load } from 'cheerio';

/**
 * Available research sources configuration
 */
export const RESEARCH_SOURCES = {
  SEMANTIC_SCHOLAR: {
    name: 'Semantic Scholar',
    baseUrl: 'https://api.semanticscholar.org/graph/v1',
    endpoints: {
      search: '/paper/search'
    },
    defaultParams: {
      limit: 3,
      fields: 'title,abstract,year,citationCount,authors,venue'
    },
    rateLimit: {
      requests: 5,
      period: 15 * 60 * 1000 // 15 minutes
    }
  },
  ARXIV: {
    name: 'arXiv',
    baseUrl: 'http://export.arxiv.org/api',
    endpoints: {
      search: '/query'
    },
    defaultParams: {
      max_results: 3,
      sortBy: 'relevance',
      sortOrder: 'descending'
    },
    rateLimit: {
      requests: 10,
      period: 60 * 1000 // 1 minute
    }
  },
  // Future sources can be added here
  GOOGLE_SCHOLAR: {
    name: 'Google Scholar',
    baseUrl: 'https://scholar.google.com',
    endpoints: {
      search: '/scholar'
    },
    // Note: Google Scholar doesn't have a public API
    // Would require web scraping with careful rate limiting
    rateLimit: {
      requests: 1,
      period: 60 * 1000 // 1 minute
    }
  }
};

/**
 * Build search URL for a research source
 */
export function buildSearchUrl(source, query) {
  const config = RESEARCH_SOURCES[source];
  if (!config) {
    throw new Error(`Unknown research source: ${source}`);
  }

  const baseUrl = config.baseUrl + config.endpoints.search;
  const params = new URLSearchParams({
    ...config.defaultParams,
    ...(source === 'ARXIV'
      ? { search_query: `all:${query}` }
      : source === 'GOOGLE_SCHOLAR'
        ? { q: query, hl: 'en', num: 3, as_sdt: '0,5' }
        : { query: query })
  });

  return `${baseUrl}?${params.toString()}`;
}

/**
 * Parse response from different research sources
 */
export function parseSourceResponse(source, data) {
  switch (source) {
    case 'SEMANTIC_SCHOLAR':
      return parseSemanticScholarResponse(data);
    case 'ARXIV':
      return parseArXivResponse(data);
    case 'GOOGLE_SCHOLAR':
      return parseGoogleScholarResponse(data);
    default:
      logger.warn(`Unknown source for parsing: ${source}`);
      return [];
  }
}

/**
 * Parse Semantic Scholar API response
 */
function parseSemanticScholarResponse(data) {
  if (!data.data || !Array.isArray(data.data)) {
    return [];
  }

  return data.data.map(paper => ({
    id: paper.paperId,
    title: paper.title,
    abstract: paper.abstract,
    year: paper.year,
    citationCount: paper.citationCount || 0,
    authors: paper.authors?.map(author => author.name) || [],
    venue: paper.venue,
    source: 'Semantic Scholar',
    url: paper.url || `https://www.semanticscholar.org/paper/${paper.paperId}`
  }));
}

/**
 * Parse arXiv API response (XML format)
 */
function parseArXivResponse(xmlData) {
  if (typeof xmlData !== 'string') {
    logger.warn('arXiv parser received non-string data');
    return [];
  }

  try {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      ignoreDeclaration: true,
      removeNSPrefix: true,
      textNodeName: 'text'
    });

    const parsed = parser.parse(xmlData);
    const entries = parsed.feed?.entry ? (Array.isArray(parsed.feed.entry) ? parsed.feed.entry : [parsed.feed.entry]) : [];

    return entries.map(entry => {
      const title = entry.title?.text || entry.title || 'Untitled arXiv paper';
      const abstract = entry.summary?.text || entry.summary || '';
      const published = entry.published?.text || entry.published;
      const id = entry.id?.text || entry.id || '';
      const links = entry.link ? (Array.isArray(entry.link) ? entry.link : [entry.link]) : [];
      const alternate = links.find(link => link.rel === 'alternate');
      const url = alternate?.href || links[0]?.href || id;

      const authors = entry.author
        ? (Array.isArray(entry.author)
            ? entry.author.map(author => author.name?.text || author.name).filter(Boolean)
            : [entry.author.name?.text || entry.author.name].filter(Boolean))
        : [];

      return {
        id,
        title: title.trim(),
        abstract: abstract.trim(),
        year: published ? Number(new Date(published).getFullYear()) : undefined,
        citationCount: 0,
        authors,
        venue: 'arXiv',
        source: 'arXiv',
        url
      };
    });
  } catch (error) {
    logger.error(`arXiv parsing error: ${error.message}`);
    return [];
  }
}

/**
 * Parse Google Scholar response (HTML scraping)
 */
function parseGoogleScholarResponse(htmlData) {
  if (typeof htmlData !== 'string') {
    logger.warn('Google Scholar parser received non-string data');
    return [];
  }

  try {
    const $ = load(htmlData);
    const results = [];

    $('.gs_r, .gs_or').each((index, element) => {
      if (results.length >= 3) return;

      const titleElement = $(element).find('.gs_rt a');
      const rawTitle = titleElement.text().trim() || $(element).find('.gs_rt').text().trim();
      const url = titleElement.attr('href') || '';
      const snippet = $(element).find('.gs_rs').text().trim();
      const metaText = $(element).find('.gs_a').text().trim();

      if (!rawTitle || !snippet) {
        return;
      }

      const authors = metaText
        .split('-')[0]
        .split(',')
        .map(author => author.trim())
        .filter(Boolean);

      const yearMatch = metaText.match(/(19|20)\d{2}/);
      const year = yearMatch ? Number(yearMatch[0]) : undefined;

      results.push({
        id: url || rawTitle,
        title: rawTitle,
        abstract: snippet,
        year,
        citationCount: 0,
        authors,
        venue: 'Google Scholar',
        source: 'Google Scholar',
        url: url.startsWith('http') ? url : `https://scholar.google.com${url}`
      });
    });

    return results;
  } catch (error) {
    logger.error(`Google Scholar parsing error: ${error.message}`);
    return [];
  }
}

/**
 * Calculate relevance score for a paper
 */
export function calculateRelevanceScore(paper, idea) {
  const ideaWords = idea.toLowerCase().split(/\s+/);
  const titleWords = (paper.title || '').toLowerCase().split(/\s+/);
  const abstractWords = (paper.abstract || '').toLowerCase().split(/\s+/);

  let score = 0;

  // Title matches (higher weight)
  ideaWords.forEach(word => {
    if (titleWords.some(titleWord => titleWord.includes(word))) score += 3;
  });

  // Abstract matches (medium weight)
  ideaWords.forEach(word => {
    const abstractMatches = abstractWords.filter(w => w.includes(word)).length;
    score += abstractMatches * 1;
  });

  // Citation bonus (quality indicator)
  if (paper.citationCount) {
    score += Math.min(paper.citationCount / 10, 5); // Max 5 points for citations
  }

  // Recency bonus (newer papers might be more relevant)
  if (paper.year) {
    const currentYear = new Date().getFullYear();
    const age = currentYear - paper.year;
    score += Math.max(0, 3 - age * 0.5); // Bonus for papers < 6 years old
  }

  return score;
}

/**
 * Filter and rank papers by quality and relevance
 */
export function filterAndRankPapers(papers, idea, maxPapers = 5) {
  return papers
    .filter(paper => paper.abstract && paper.abstract.length > 100) // Quality filter
    .map(paper => ({
      ...paper,
      relevanceScore: calculateRelevanceScore(paper, idea)
    }))
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxPapers);
}