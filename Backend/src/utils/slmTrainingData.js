import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Research SLM Training Data Preparation
 * Prepares datasets for fine-tuning SLMs on research paper analysis and startup idea enhancement
 */

class SLMTrainingData {
  constructor() {
    this.trainingData = [];
    this.validationData = [];
  }

  /**
   * Generate synthetic training examples for research summarization
   */
  generateResearchSummarizationData() {
    const examples = [
      {
        input: "Paper Title: Deep Learning for Startup Success Prediction\nAbstract: This paper presents a novel neural network architecture that predicts startup success using financial metrics, team composition, and market data. The model achieves 85% accuracy on historical data.\n\nPaper Title: AI-Driven Market Analysis\nAbstract: Using natural language processing and machine learning, we analyze market trends from news articles and social media to predict industry shifts.",
        output: "Research shows that deep learning models can predict startup success with 85% accuracy using financial metrics, team data, and market analysis. AI-driven market analysis using NLP and ML can predict industry trends from news and social media."
      },
      {
        input: "Paper Title: Blockchain for Supply Chain Transparency\nAbstract: We implement a blockchain-based system for supply chain tracking that ensures product authenticity and reduces fraud by 70%.\n\nPaper Title: IoT Sensors in Manufacturing\nAbstract: Internet of Things sensors improve manufacturing efficiency by 40% through predictive maintenance and real-time monitoring.",
        output: "Blockchain technology enables 70% reduction in supply chain fraud through transparent tracking systems. IoT sensors boost manufacturing efficiency by 40% via predictive maintenance and real-time monitoring."
      }
    ];

    return examples.map(example => ({
      instruction: "Summarize the key findings and technologies from these research papers.",
      input: example.input,
      output: example.output
    }));
  }

  /**
   * Generate training data for startup idea enhancement
   */
  generateIdeaEnhancementData() {
    const examples = [
      {
        input: "Startup Idea: A fitness tracking app\nResearch: Studies show gamification increases user engagement by 60%, and AI personalization improves retention by 45%.",
        output: "Create an AI-powered fitness app with gamified challenges, personalized workout recommendations based on user data, and social competition features to increase engagement and retention."
      },
      {
        input: "Startup Idea: Online learning platform\nResearch: Adaptive learning algorithms improve knowledge retention by 35%, and peer collaboration increases completion rates by 50%.",
        output: "Build an adaptive online learning platform with personalized learning paths, AI-driven content recommendations, peer study groups, and collaborative projects to maximize student success."
      }
    ];

    return examples.map(example => ({
      instruction: "Enhance this startup idea using the provided research insights to create an advanced, innovative version.",
      input: example.input,
      output: example.output
    }));
  }

  /**
   * Generate trend extraction training data
   */
  generateTrendExtractionData() {
    const examples = [
      {
        input: "Research Papers:\n1. AI adoption in healthcare increased by 300% in 2023\n2. Machine learning reduces diagnostic errors by 40%\n3. Predictive analytics prevents hospital readmissions\n4. Natural language processing automates medical documentation",
        output: "1. Rapid AI adoption in healthcare (300% growth)\n2. ML-driven diagnostic accuracy improvements\n3. Predictive analytics for patient care\n4. NLP automation of medical workflows"
      }
    ];

    return examples.map(example => ({
      instruction: "Extract and list the key trends from these research findings.",
      input: example.input,
      output: example.output
    }));
  }

  /**
   * Generate improvement suggestion training data
   */
  generateImprovementData() {
    const examples = [
      {
        input: "Idea: Basic e-commerce website\nResearch: Voice search increases conversion by 25%, AR try-on features boost sales by 30%, AI chatbots improve customer satisfaction by 40%",
        output: "1. Add voice search functionality to improve conversion rates\n2. Implement AR try-on features for products\n3. Integrate AI chatbot for customer support\n4. Use AI for personalized product recommendations"
      }
    ];

    return examples.map(example => ({
      instruction: "Suggest concrete improvements to this startup idea based on the research findings.",
      input: example.input,
      output: example.output
    }));
  }

  /**
   * Create complete training dataset
   */
  createTrainingDataset() {
    this.trainingData = [
      ...this.generateResearchSummarizationData(),
      ...this.generateIdeaEnhancementData(),
      ...this.generateTrendExtractionData(),
      ...this.generateImprovementData()
    ];

    // Split into training and validation (80/20)
    const splitIndex = Math.floor(this.trainingData.length * 0.8);
    this.validationData = this.trainingData.slice(splitIndex);
    this.trainingData = this.trainingData.slice(0, splitIndex);

    return {
      training: this.trainingData,
      validation: this.validationData
    };
  }

  /**
   * Save training data to JSON files
   */
  saveTrainingData(outputDir = './training-data') {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const dataset = this.createTrainingDataset();

    // Save in JSONL format (one JSON object per line) for Hugging Face training
    const trainingPath = path.join(outputDir, 'research-slm-train.jsonl');
    const validationPath = path.join(outputDir, 'research-slm-val.jsonl');

    // Convert to instruction-tuning format
    const formatForTraining = (data) => {
      return data.map(item => ({
        instruction: item.instruction,
        input: item.input,
        output: item.output
      }));
    };

    fs.writeFileSync(
      trainingPath,
      formatForTraining(dataset.training).map(JSON.stringify).join('\n')
    );

    fs.writeFileSync(
      validationPath,
      formatForTraining(dataset.validation).map(JSON.stringify).join('\n')
    );

    console.log(`Training data saved to ${outputDir}`);
    console.log(`Training examples: ${dataset.training.length}`);
    console.log(`Validation examples: ${dataset.validation.length}`);

    return {
      trainingPath,
      validationPath,
      trainingCount: dataset.training.length,
      validationCount: dataset.validation.length
    };
  }

  /**
   * Load additional research papers from Semantic Scholar for training
   */
  async loadRealResearchPapers(query, limit = 100) {
    try {
      const response = await fetch(
        `https://api.semanticscholar.org/graph/v1/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=title,abstract,year,citationCount`
      );

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Failed to load research papers:', error);
      return [];
    }
  }

  /**
   * Generate training data from real research papers
   */
  async generateFromRealPapers(queries = ['artificial intelligence', 'machine learning', 'startup', 'innovation']) {
    const allPapers = [];

    for (const query of queries) {
      console.log(`Loading papers for query: ${query}`);
      const papers = await this.loadRealResearchPapers(query, 25);
      allPapers.push(...papers);
    }

    // Remove duplicates and filter
    const uniquePapers = allPapers
      .filter((paper, index, self) =>
        index === self.findIndex(p => p.paperId === paper.paperId)
      )
      .filter(paper => paper.abstract && paper.abstract.length > 100)
      .slice(0, 200); // Limit to 200 papers

    console.log(`Loaded ${uniquePapers.length} unique research papers`);

    // Generate summarization training data
    const summarizationData = [];
    for (let i = 0; i < uniquePapers.length; i += 3) {
      const batch = uniquePapers.slice(i, i + 3);
      if (batch.length >= 2) {
        const input = batch.map(p => `${p.title}: ${p.abstract.substring(0, 300)}`).join('\n\n');
        const output = `Key research findings include ${batch.map(p => p.title.toLowerCase()).join(', ')}. These papers explore ${batch[0].abstract.substring(0, 100)}...`;

        summarizationData.push({
          instruction: "Summarize the key insights from these research papers.",
          input,
          output
        });
      }
    }

    return summarizationData;
  }
}

// Export for use in training scripts
export default SLMTrainingData;

// CLI usage
if (import.meta.url === `file://${process.argv[1]}`) {
  const trainer = new SLMTrainingData();

  // Generate synthetic data
  trainer.saveTrainingData('./training-data/synthetic');

  // Generate from real papers (uncomment when ready)
  // trainer.generateFromRealPapers().then(realData => {
  //   fs.writeFileSync('./training-data/real-papers.jsonl',
  //     realData.map(JSON.stringify).join('\n'));
  // });
}