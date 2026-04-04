import { askAI } from "../services/aiService.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";
import { RESEARCH_SOURCES, buildSearchUrl, parseSourceResponse, filterAndRankPapers } from "../utils/researchSources.js";

// In-memory fallback cache for when MongoDB is unavailable
const memoryCache = new Map();

// Research Cache Schema — only register the model if Mongoose has a connection ready
let ResearchCache = null;

function getResearchCacheModel() {
  if (ResearchCache) return ResearchCache;
  
  // Only create the Mongoose model when MongoDB is actually connected
  if (mongoose.connection.readyState !== 1) {
    return null;
  }

  try {
    // Check if the model is already registered
    ResearchCache = mongoose.model('ResearchCache');
  } catch (_) {
    const researchCacheSchema = new mongoose.Schema({
      idea: { type: String, required: true, index: true },
      papers: [{
        title: String,
        abstract: String,
        paperId: String,
        authors: [String],
        year: Number,
        citationCount: Number,
        venue: String,
        source: String,
        url: String
      }],
      analysis: {
        research_summary: String,
        trends: [String],
        improvements: [String],
        advanced_idea: String
      },
      createdAt: { type: Date, default: Date.now, expires: '24h' }
    });
    ResearchCache = mongoose.model('ResearchCache', researchCacheSchema);
  }

  return ResearchCache;
}

/**
 * Research Intelligence Agent Controller
 * Enhances startup ideas using real research papers from Semantic Scholar
 */

/**
 * Fetch relevant research papers from multiple academic sources
 */
async function fetchSourcePapers(sourceKey, idea, controller) {
  const sourceConfig = RESEARCH_SOURCES[sourceKey];
  const url = buildSearchUrl(sourceKey, idea);

  logger.info(`Research → Searching ${sourceConfig.name} for: ${idea}`);

  const response = await fetch(url, {
    signal: controller.signal,
    headers: {
      'User-Agent': 'FounderGPT-Research-Agent/1.0',
      'Accept': sourceKey === 'GOOGLE_SCHOLAR'
        ? 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        : 'application/json',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });

  if (!response.ok) {
    throw new Error(`${sourceConfig.name} returned ${response.status}`);
  }

  const data = sourceKey === 'ARXIV' ? await response.text() : await response.json();
  const papers = parseSourceResponse(sourceKey, data);

  return papers.map(paper => ({
    ...paper,
    source: sourceConfig.name
  }));
}

async function fetchResearchPapers(idea) {
  const sources = [
    'SEMANTIC_SCHOLAR',
    'ARXIV'
  ];
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const results = await Promise.allSettled(
      sources.map((sourceKey) => fetchSourcePapers(sourceKey, idea, controller))
    );

    clearTimeout(timeoutId);

    const allPapers = results.flatMap((result, index) => {
      const sourceKey = sources[index];
      if (result.status === 'fulfilled') {
        logger.info(`Research → Found ${result.value.length} papers from ${RESEARCH_SOURCES[sourceKey].name}`);
        return result.value;
      }

      logger.warn(`Research → Failed to fetch from ${RESEARCH_SOURCES[sourceKey].name}: ${result.reason?.message || 'unknown error'}`);
      return [];
    });

    return filterAndRankPapers(allPapers, idea, 3);
  } catch (error) {
    clearTimeout(timeoutId);
    logger.error(`Research → Failed to fetch research papers: ${error.message}`);
    throw new Error(`Failed to fetch research papers: ${error.message}`);
  }
}

function generateQuickResearchAnalysis(idea, papers) {
  const topPapers = papers.slice(0, 3);
  const summary = topPapers
    .map(paper => `${paper.title}: ${cleanAbstract(paper.abstract)}`)
    .join(' ')
    .substring(0, 800);

  const trends = Array.from(new Set(
    topPapers.flatMap((paper) => paper.abstract
      .split(/\.|\\n|\\r/)
      .map(sentence => sentence.trim())
      .filter(sentence => sentence.length > 30)
      .slice(0, 2))
  )).slice(0, 3);

  const improvements = [
    `Focus on the top research trend: ${trends[0] || 'research-driven innovation'}`,
    `Refine the idea around practical applications and rapid deployment`,
    `Validate the most promising paper findings with a small pilot or prototype`
  ];

  const advancedIdea = `${idea} enhanced with a stronger research-backed focus on ${trends[0] || 'core competitive advantage'}.`;

  return {
    research_summary: summary || `Selected research papers provide foundational insight for ${idea}.`,
    trends,
    improvements,
    advanced_idea: advancedIdea
  };
}

/**
 * Clean and format abstract text
 */
function cleanAbstract(abstract) {
  if (!abstract) return '';
  return abstract
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500);
}

/**
 * Handle research analysis request
 */
export async function handleResearchAnalyze(req, res) {
  try {
    const { idea, bypassCache = false } = req.body;

    if (!idea || typeof idea !== 'string' || idea.trim().length === 0) {
      return res.status(400).json({
        status: "error",
        message: "Invalid input: 'idea' is required and must be a non-empty string"
      });
    }

    const normalizedIdea = idea.trim().toLowerCase();

    logger.info(`Research → Analyzing idea: ${idea.substring(0, 100)}...`);

    // Check cache first (unless bypassed)
    if (!bypassCache) {
      // Try MongoDB cache
      const CacheModel = getResearchCacheModel();
      if (CacheModel) {
        try {
          const cachedResult = await CacheModel.findOne({ idea: normalizedIdea });
          if (cachedResult && cachedResult.analysis) {
            logger.info(`Research → Returning cached analysis (MongoDB)`);
            return res.json({
              status: "success",
              data: {
                papers: cachedResult.papers || [],
                analysis: cachedResult.analysis
              },
              cached: true,
              message: "Research analysis retrieved from cache"
            });
          }
        } catch (dbErr) {
          logger.warn(`Research → MongoDB cache read failed: ${dbErr.message}`);
        }
      }

      // Try in-memory cache fallback
      const memCached = memoryCache.get(normalizedIdea);
      if (memCached && (Date.now() - memCached.createdAt < 3_600_000)) {
        logger.info(`Research → Returning cached analysis (memory)`);
        return res.json({
          status: "success",
          data: memCached.data,
          cached: true,
          message: "Research analysis retrieved from cache"
        });
      }
    } else {
      logger.info(`Research → Bypassing cache as requested`);
    }

    // For testing without API limits, use mock data
    const useMockData = process.env.USE_MOCK_RESEARCH_DATA === 'true';

    let papers;
    if (useMockData) {
      logger.info(`Research → Using mock research data for testing`);

      const ideaLower = idea.toLowerCase();
      if (ideaLower.includes('healthcare') || ideaLower.includes('medical') || ideaLower.includes('diagnostic')) {
        papers = [
          {
            title: "AI-Powered Medical Diagnostics: Deep Learning Approaches",
            abstract: "This comprehensive study evaluates artificial intelligence applications in medical diagnostics. Research demonstrates that AI-powered diagnostic systems can improve accuracy by 34% across multiple medical imaging modalities."
          },
          {
            title: "Machine Learning in Healthcare: Adoption and Impact Analysis",
            abstract: "Examining the integration of machine learning in healthcare systems, this research shows that AI-driven diagnostic tools are adopted 45% faster in hospitals when they demonstrate clear clinical outcome improvements."
          },
          {
            title: "Predictive Analytics for Disease Detection and Prevention",
            abstract: "Using advanced neural networks, this research demonstrates how predictive analytics can identify disease patterns with 89% accuracy using patient data and medical imaging."
          }
        ];
      } else if (ideaLower.includes('finance') || ideaLower.includes('fintech') || ideaLower.includes('investment')) {
        papers = [
          {
            title: "AI-Driven Financial Planning: A Machine Learning Approach",
            abstract: "This research presents a comprehensive analysis of artificial intelligence applications in personal finance management. The study demonstrates that AI-powered financial advisors can improve investment returns by 23%."
          },
          {
            title: "Behavioral Economics and Fintech Adoption Among Millennials",
            abstract: "Examining the intersection of behavioral economics and financial technology adoption, this paper reveals that millennials are 40% more likely to adopt AI-driven financial tools."
          },
          {
            title: "Predictive Analytics for Personal Finance Management",
            abstract: "Using advanced machine learning models, this study shows how predictive analytics can forecast financial goals achievement with 78% accuracy."
          }
        ];
      } else {
        papers = [
          {
            title: "Artificial Intelligence in Business Process Optimization",
            abstract: "This research examines how AI technologies can optimize business processes across various industries. The study demonstrates that AI-powered automation can improve operational efficiency by 41%."
          },
          {
            title: "Machine Learning Adoption in Small and Medium Enterprises",
            abstract: "Analyzing the adoption patterns of machine learning technologies in SMEs, this research shows that companies implementing AI solutions see 35% improvement in decision-making accuracy."
          },
          {
            title: "Predictive Analytics for Business Intelligence",
            abstract: "Using advanced analytics models, this study demonstrates how predictive analytics can improve business forecasting accuracy by 67%."
          }
        ];
      }
    } else {
      papers = await fetchResearchPapers(idea);
    }

    if (papers.length === 0) {
      logger.warn(`Research → No papers found for idea: ${idea}`);
      return res.status(404).json({
        status: "error",
        message: "No relevant research papers found for this idea"
      });
    }

    // Extract and clean abstracts
    const abstracts = papers
      .filter(paper => paper.abstract)
      .map(paper => `${paper.title}: ${cleanAbstract(paper.abstract)}`)
      .join('\n\n');

    if (!abstracts) {
      logger.warn(`Research → No abstracts available for idea: ${idea}`);
      return res.status(404).json({
        status: "error",
        message: "Research papers found but no abstracts available"
      });
    }

    logger.info(`Research → Found ${papers.length} papers with abstracts`);

    // For testing: return papers directly without SLM processing
    if (req.body.skipSLM) {
      const analysis = generateQuickResearchAnalysis(idea, papers);
      return res.json({
        status: "success",
        data: {
          papers,
          analysis
        },
        message: "Papers fetched successfully (SLM skipped)"
      });
    }

    // Use SLM for research analysis
    const result = generateQuickResearchAnalysis(idea, papers);

    const responseData = { papers, analysis: result };

    // Cache the result — try MongoDB first, fall back to memory
    const CacheModel = getResearchCacheModel();
    if (CacheModel) {
      try {
        await CacheModel.findOneAndUpdate(
          { idea: normalizedIdea },
          {
            papers: papers.map((p) => ({
              title: p.title,
              abstract: p.abstract,
              paperId: p.paperId,
              authors: p.authors || [],
              year: p.year,
              citationCount: p.citationCount,
              venue: p.venue,
              source: p.source,
              url: p.url
            })),
            analysis: result
          },
          { upsert: true, new: true }
        );
      } catch (dbErr) {
        logger.warn(`Research → MongoDB cache write failed: ${dbErr.message}, using memory cache`);
        memoryCache.set(normalizedIdea, { data: responseData, createdAt: Date.now() });
      }
    } else {
      memoryCache.set(normalizedIdea, { data: responseData, createdAt: Date.now() });
    }

    res.json({
      status: "success",
      data: responseData,
      cached: false,
      message: "Research analysis completed successfully"
    });

  } catch (error) {
    logger.error(`Research → Error: ${error.message}`);
    res.status(500).json({
      status: "error",
      message: error.message || "Internal server error during research analysis"
    });
  }
}