import axios from "axios";
import { askAI } from "./aiService.js";
import logger from "../utils/logger.js";

export async function analyzeResearch(idea) {
  try {
    logger.info("Research → Fetching papers");

    const response = await axios.get(
      "https://api.semanticscholar.org/graph/v1/paper/search",
      {
        params: {
          query: idea.idea,
          limit: 5,
          fields: "title,abstract"
        }
      }
    );

    const papers = response.data.data || [];

    const abstracts = papers
      .map(p => p.abstract)
      .filter(Boolean)
      .join("\n\n");

    logger.info("Research → Sending to AI");

    const result = await askAI(
      `You are a research analyst and startup strategist.

Return JSON:
{
  "research_summary": "...",
  "trends": ["...", "..."],
  "improvements": ["...", "..."],
  "advanced_idea": "..."
}`,
      `Startup Idea:
${idea.idea}

Research Abstracts:
${abstracts}`
    );

    return result;

  } catch (error) {
    logger.error("Research error:", error.message);
    throw new Error("Failed to analyze research data");
  }
}