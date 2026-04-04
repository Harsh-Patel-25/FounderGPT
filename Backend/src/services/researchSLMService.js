import { pipeline } from '@xenova/transformers';
import logger from '../utils/logger.js';

/**
 * Research SLM Service
 * Uses a fine-tuned small language model for research paper analysis and startup idea enhancement
 */

class ResearchSLMService {
  constructor() {
    this.model = null;
    this.tokenizer = null;
    this.isInitialized = false;
    this.modelPath = process.env.RESEARCH_SLM_MODEL || 'Xenova/distilbart-cnn-6-6';
  }

  /**
   * Initialize the SLM model
   * Using a lightweight model suitable for research summarization
   */
  async initialize() {
    try {
      if (this.isInitialized) return;

      logger.info('Research SLM → Initializing model...');

      // Using a small, efficient model for summarization tasks
      // You can replace with your fine-tuned model once trained
      this.model = await pipeline('summarization', this.modelPath);

      this.isInitialized = true;
      logger.info('Research SLM → Model initialized successfully');

    } catch (error) {
      logger.error(`Research SLM → Failed to initialize: ${error.message}`);
      throw new Error(`SLM initialization failed: ${error.message}`);
    }
  }

  /**
   * Summarize research papers using SLM
   */
  async summarizePapers(papers) {
    await this.initialize();

    try {
      const abstracts = papers
        .filter(paper => paper.abstract)
        .map(paper => `${paper.title}: ${paper.abstract}`)
        .join('\n\n');

      if (!abstracts) {
        throw new Error('No abstracts available for summarization');
      }

      logger.info('Research SLM → Generating paper summary...');

      const summary = await this.model(abstracts, {
        max_length: 200,
        min_length: 50,
        do_sample: false,
      });

      return summary[0].summary_text;

    } catch (error) {
      logger.error(`Research SLM → Summarization failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Analyze startup idea and generate advanced version using research insights
   */
  async enhanceIdeaWithResearch(idea, researchSummary) {
    await this.initialize();

    try {
      const prompt = `You are a research-driven startup strategist. Analyze this startup idea using the provided research insights and create an enhanced version.

Startup Idea: ${idea}

Research Insights: ${researchSummary}

Task: Generate an advanced, research-backed version of this startup idea that incorporates the latest research findings. Focus on innovation, technical feasibility, and market potential.

Advanced Idea:`;

      logger.info('Research SLM → Enhancing idea with research...');

      // For now, using the summarization model - in production, you'd use a fine-tuned model
      // that can handle this specific task
      const enhanced = await this.model(prompt, {
        max_length: 300,
        min_length: 100,
        do_sample: true,
        temperature: 0.7,
      });

      return enhanced[0].summary_text;

    } catch (error) {
      logger.error(`Research SLM → Idea enhancement failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Extract key trends from research papers
   */
  async extractTrends(papers) {
    await this.initialize();

    try {
      const abstracts = papers
        .filter(paper => paper.abstract)
        .map(paper => paper.abstract)
        .join(' ');

      const trendPrompt = `Analyze these research abstracts and identify the top 3-5 key trends in this field. Focus on emerging technologies, methodologies, and market shifts.

Abstracts: ${abstracts}

Key Trends:`;

      logger.info('Research SLM → Extracting trends...');

      const trends = await this.model(trendPrompt, {
        max_length: 150,
        min_length: 50,
        do_sample: true,
        temperature: 0.8,
      });

      // Parse trends from the generated text
      const trendText = trends[0].summary_text;
      const trendList = trendText
        .split(/[•\-\d]+\.?\s*/)
        .filter(trend => trend.trim().length > 10)
        .slice(0, 5);

      return trendList;

    } catch (error) {
      logger.error(`Research SLM → Trend extraction failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate improvement suggestions based on research
   */
  async suggestImprovements(idea, researchSummary) {
    await this.initialize();

    try {
      const improvementPrompt = `Based on this research summary, suggest 3-5 concrete improvements to enhance this startup idea. Each suggestion should be actionable and research-backed.

Startup Idea: ${idea}

Research Summary: ${researchSummary}

Improvement Suggestions:`;

      logger.info('Research SLM → Generating improvements...');

      const improvements = await this.model(improvementPrompt, {
        max_length: 200,
        min_length: 80,
        do_sample: true,
        temperature: 0.7,
      });

      // Parse improvements from the generated text
      const improvementText = improvements[0].summary_text;
      const improvementList = improvementText
        .split(/[•\-\d]+\.?\s*/)
        .filter(improvement => improvement.trim().length > 15)
        .slice(0, 5);

      return improvementList;

    } catch (error) {
      logger.error(`Research SLM → Improvement generation failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Complete research analysis pipeline
   */
  async performCompleteAnalysis(idea, papers) {
    try {
      logger.info('Research SLM → Starting complete analysis pipeline...');

      // Step 1: Summarize research papers
      const researchSummary = await this.summarizePapers(papers);

      // Step 2: Extract trends
      const trends = await this.extractTrends(papers);

      // Step 3: Generate improvements
      const improvements = await this.suggestImprovements(idea, researchSummary);

      // Step 4: Create advanced idea
      const advancedIdea = await this.enhanceIdeaWithResearch(idea, researchSummary);

      const result = {
        research_summary: researchSummary,
        trends: trends,
        improvements: improvements,
        advanced_idea: advancedIdea
      };

      logger.info('Research SLM → Complete analysis finished');
      return result;

    } catch (error) {
      logger.error(`Research SLM → Complete analysis failed: ${error.message}`);
      throw error;
    }
  }
}

// Singleton instance
const researchSLM = new ResearchSLMService();

export default researchSLM;