import { askNvidia } from "./nvidiaService.js";
import { askOpenAI } from "./openaiService.js";
import { askGemini } from "./geminiService.js";
import logger from "../utils/logger.js";

/**
 * AI Service Manager with retry handling
 */

const SERVICES = {
  NVIDIA: 'nvidia',
  OPENAI: 'openai',
  GEMINI: 'gemini'
};

const SERVICE_FUNCTIONS = {
  [SERVICES.NVIDIA]: askNvidia,
  [SERVICES.OPENAI]: askOpenAI,
  [SERVICES.GEMINI]: askGemini
};

const rateLimitTracker = {
  [SERVICES.NVIDIA]: { lastError: null, consecutiveErrors: 0 },
  [SERVICES.OPENAI]: { lastError: null, consecutiveErrors: 0 },
  [SERVICES.GEMINI]: { lastError: null, consecutiveErrors: 0 }
};

function serviceEnabled(serviceName) {
  switch (serviceName) {
    case SERVICES.NVIDIA:
      return !!process.env.NVIDIA_API_KEY;
    case SERVICES.OPENAI:
      return !!process.env.OPENAI_API_KEY;
    case SERVICES.GEMINI:
      return !!process.env.GEMINI_API_KEY;
    default:
      return false;
  }
}

function buildServiceOrder(preferredService, skipServices = []) {
  const ordered = [preferredService, ...Object.values(SERVICES).filter(s => s !== preferredService)];
  return ordered.filter((service) => serviceEnabled(service) && !skipServices.includes(service));
}

function localFallbackEnabled() {
  return process.env.ALLOW_LOCAL_AI_FALLBACK === 'true' || process.env.NODE_ENV === 'development';
}

// ─── HELPERS ──────────────────────────────────────────────────────────────

function calculateRiskScore(risks) {
  if (!risks || risks.length === 0) return 0;
  const total = risks.reduce((acc, r) => acc + (r.probability * r.impact), 0);
  // Returns a score out of 10 based on weighted average (P*I/10)
  return parseFloat((total / (risks.length * 10)).toFixed(1));
}

// ─── LOCAL FALLBACK RESPONSES ──────────────────────────────────────────────

function localAiFallback(systemPrompt, userPrompt) {
  logger.warn('AI Service → Using local development fallback response');

  const ideaMatch = userPrompt.match(/Startup Idea: (.+)/);
  const idea = ideaMatch ? ideaMatch[1].toLowerCase() : '';

  // --- Competitors ---
  let competitors = [];
  if (idea.includes('social media') && idea.includes('pet')) {
    competitors = [
      { name: 'Instagram', strengths: ['Massive user base', 'Strong visual content'], weaknesses: ['Generic platform', 'Algorithm changes'] },
      { name: 'TikTok', strengths: ['Viral potential', 'Short-form video'], weaknesses: ['Short attention span', 'Algorithm dependency'] },
      { name: 'Petco App', strengths: ['Pet-focused community', 'E-commerce integration'], weaknesses: ['Limited social features', 'Regional focus'] },
      { name: 'Chewy', strengths: ['Pet product expertise', 'Loyal customer base'], weaknesses: ['E-commerce only', 'No social interaction'] }
    ];
  } else if (idea.includes('ai') || idea.includes('artificial intelligence')) {
    competitors = [
      { name: 'OpenAI', strengths: ['Leading AI technology', 'Strong brand'], weaknesses: ['High costs', 'API limitations'] },
      { name: 'Google AI', strengths: ['Deep integration', 'Scalable infrastructure'], weaknesses: ['Complex pricing', 'Less accessible'] },
      { name: 'Anthropic', strengths: ['Safety-focused AI', 'Ethical approach'], weaknesses: ['Limited availability', 'Newer platform'] },
      { name: 'Hugging Face', strengths: ['Open-source models', 'Community driven'], weaknesses: ['Variable quality', 'Less support'] }
    ];
  } else {
    competitors = [
      { name: 'Competitor One', strengths: ['Established brand', 'Strong user base'], weaknesses: ['Higher cost', 'Lower customization'] },
      { name: 'Competitor Two', strengths: ['Fast onboarding', 'Strong analytics'], weaknesses: ['Limited integrations', 'Smaller market reach'] },
      { name: 'Competitor Three', strengths: ['Low price', 'Good retention'], weaknesses: ['Basic feature set', 'Weaker support'] },
      { name: 'Competitor Four', strengths: ['Innovative product', 'Strong network'], weaknesses: ['Higher churn', 'Early-stage maturity'] }
    ];
  }

  // --- Business Model ---
  let businessModel = {};
  if (idea.includes('social media') || idea.includes('platform')) {
    businessModel = {
      type: 'Freemium SaaS',
      description: 'A scalable subscription-based model with premium features for power users and a free entry-level tier to build community.',
      revenueStreams: ['Premium subscriptions', 'Advertising', 'Affiliate partnerships'],
      pricingStrategy: 'Free basic features with premium upgrades for advanced tools, analytics, and enhanced visibility.',
      unitEconomics: 'High gross margins from digital delivery, viral growth potential, and predictable recurring revenue from premium users.'
    };
  } else if (idea.includes('ai') || idea.includes('automation')) {
    businessModel = {
      type: 'Usage-based SaaS',
      description: 'Pay-as-you-go model based on API calls or processing volume, ideal for AI-powered services.',
      revenueStreams: ['API usage fees', 'Enterprise subscriptions', 'Custom integrations'],
      pricingStrategy: 'Tiered usage limits with overage charges, enterprise contracts for high-volume users.',
      unitEconomics: 'Variable costs tied to compute usage, high margins on efficient infrastructure.'
    };
  } else {
    businessModel = {
      type: 'Freemium SaaS',
      description: 'A scalable subscription-based model with premium features for power users and a free entry-level tier.',
      revenueStreams: ['Subscription fees', 'Professional services', 'Referral partnerships'],
      pricingStrategy: 'Tiered pricing with a compelling free plan and upgrade incentives.',
      unitEconomics: 'High gross margins from digital delivery and predictable recurring revenue.'
    };
  }

  const defaultAnalysis = {
    analysis: [
      {
        title: 'Problem & Target Audience',
        description: 'The idea targets a clear user segment with a high likelihood of adoption and a defined problem statement.',
        score: 8.0,
        details: ['Strong market need', 'Clear target audience', 'Early adoption potential']
      },
      {
        title: 'Market Opportunity',
        description: 'The opportunity is supported by growing demand and a market gap for the proposed solution.',
        score: 7.5,
        details: ['Growing demand', 'Limited direct competition', 'Strong value proposition']
      },
      {
        title: 'Unique Value Proposition',
        description: 'The business offers a differentiated product that addresses user pain points with a research-backed approach.',
        score: 7.8,
        details: ['Differentiated offering', 'Customer-focused features', 'Strong positioning']
      },
      {
        title: 'Business Model Viability',
        description: 'The revenue model is viable with reasonable monetization opportunities and clear customer value.',
        score: 7.2,
        details: ['Clear monetization path', 'Sustainable customer acquisition', 'Early revenue potential']
      }
    ]
  };

  const lowerPrompt = systemPrompt.toLowerCase();

  // --- Dashboard (unified call) ---
  if (lowerPrompt.includes('single json object') || lowerPrompt.includes('getcompletedashboarddata')) {
    return {
      analysis: defaultAnalysis,
      competitors: { competitors },
      businessModel: { businessModel },
      score: {
        score: {
          overall: 7.6,
          marketFit: 8.0,
          innovation: 7.3,
          feasibility: 7.0,
          scalability: 8.2,
          labels: ['Market Demand', 'Competition', 'Revenue', 'Difficulty'],
          values: [8.0, 7.0, 7.2, 6.5],
          summary: 'The idea has strong market potential and a feasible business model for early growth.'
        }
      }
    };
  }

  // --- Market Potential (matches frontend MarketPotential type) ---
  if (lowerPrompt.includes('market potential') || lowerPrompt.includes('"marketpotential"') || lowerPrompt.includes('tam') || lowerPrompt.includes('sam') || lowerPrompt.includes('som')) {
    return {
      marketPotential: {
        tamSamSom: {
          tam: '$120B',
          sam: '$25B',
          som: '$4.5B'
        },
        marketGrowthRate: '10% annual growth',
        marketTrends: [
          'Increasing digital adoption among target users',
          'Subscription-based revenue models gaining traction',
          'AI-enabled personalization driving retention'
        ],
        targetDemographics: {
          primary: ['Millennial professionals', 'Small business owners'],
          secondary: ['Tech-savvy parents', 'Freelancers and contractors']
        },
        marketPenetrationStrategy: 'Launch with a freemium model, partner with niche communities, and expand via targeted digital marketing.',
        marketRisks: ['Regulatory changes', 'Intense competition from established platforms', 'Customer adoption delays'],
        opportunities: ['First-mover advantage in underserved niche', 'High-margin subscription upgrades', 'Strategic partnerships with industry influencers']
      }
    };
  }

  // --- Tech Stack (matches frontend TechStackData type) ---
  if (lowerPrompt.includes('tech') && (lowerPrompt.includes('stack') || lowerPrompt.includes('architect'))) {
    return {
      techStack: {
        frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
        backend: ['Node.js', 'Express', 'GraphQL'],
        database: ['PostgreSQL', 'Redis'],
        infrastructure: ['AWS EC2', 'AWS S3', 'CloudFront CDN'],
        thirdPartyServices: ['Stripe', 'SendGrid', 'Sentry', 'Auth0'],
        developmentTools: ['GitHub Actions', 'Docker', 'Jest', 'ESLint']
      },
      scopes: {
        phase1MVP: {
          scope: 'Core product features, user authentication, basic dashboard',
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          estimatedDevelopmentTime: '8-12 weeks'
        },
        phase2Growth: {
          scope: 'Analytics dashboard, API integrations, mobile responsiveness',
          technologies: ['GraphQL', 'Redis', 'AWS Lambda', 'SendGrid'],
          estimatedDevelopmentTime: '10-14 weeks'
        },
        phase3Scale: {
          scope: 'Microservices architecture, ML pipeline, enterprise features',
          technologies: ['Kubernetes', 'TensorFlow', 'Elasticsearch', 'Kafka'],
          estimatedDevelopmentTime: '16-20 weeks'
        }
      },
      infrastructureNeeds: {
        hosting: 'AWS with multi-AZ deployment for high availability',
        scalability: 'Auto-scaling groups with load balancing and CDN caching',
        security: 'WAF, SSL/TLS, SOC2 compliance, encrypted data at rest',
        monitoring: 'Sentry for errors, Datadog for APM, CloudWatch for infra'
      }
    };
  }

  // --- Funding (matches frontend FundingData type) ---
  if (lowerPrompt.includes('funding') || lowerPrompt.includes('burn rate') || lowerPrompt.includes('venture capital')) {
    return {
      fundingRequirements: {
        seed: {
          amount: '$500K - $1.5M',
          timeframe: '3-6 months to raise',
          uses: ['40% Product development', '25% Team hiring', '20% Marketing & growth', '15% Operations & legal']
        },
        seriesA: {
          amount: '$5M - $10M',
          timeframe: '12-18 months after seed',
          uses: ['35% Scale engineering team', '30% Market expansion', '20% Sales & partnerships', '15% Operations']
        }
      },
      burnRate: {
        monthlyBurn: '$45K - $75K',
        runway: '18-24 months with seed funding',
        breakEvenTimeline: '24-30 months from launch'
      },
      teamComposition: [
        { role: 'CEO / Founder', salary: '$80K-$120K', timing: 'Immediate' },
        { role: 'CTO / Tech Lead', salary: '$100K-$140K', timing: 'Immediate' },
        { role: 'Full-Stack Developer', salary: '$80K-$110K', timing: 'Month 2' },
        { role: 'Product Designer', salary: '$70K-$95K', timing: 'Month 3' },
        { role: 'Growth Marketing Manager', salary: '$65K-$90K', timing: 'Month 4' },
        { role: 'Customer Success', salary: '$50K-$70K', timing: 'Month 6' }
      ],
      keyExpenses: {
        personnel: '55% of budget',
        infrastructure: '15% of budget',
        marketing: '20% of budget',
        operations: '10% of budget'
      },
      fundingStrategy: 'Bootstrap to MVP, raise a pre-seed/angel round for initial traction, then pursue institutional seed funding after demonstrating product-market fit with 100+ active users and growing MRR.'
    };
  }

  // --- Risk Assessment (matches frontend RiskAssessmentData type) ---
  if (lowerPrompt.includes('risk') && (lowerPrompt.includes('assess') || lowerPrompt.includes('management'))) {
    return {
      riskAssessment: {
        risks: [
          { category: 'Market', risk: 'Slow customer adoption and longer sales cycles than expected', probability: 6, impact: 8, mitigation: 'Build a strong early-adopter community with beta programs and referral incentives' },
          { category: 'Technical', risk: 'Scalability bottlenecks as user base grows beyond MVP capacity', probability: 5, impact: 7, mitigation: 'Design for horizontal scaling from day one; use cloud-native architecture' },
          { category: 'Competitive', risk: 'Established players launching competing features or acquiring startups', probability: 7, impact: 7, mitigation: 'Focus on niche differentiation and build strong brand loyalty early' },
          { category: 'Financial', risk: 'Running out of runway before achieving product-market fit', probability: 5, impact: 9, mitigation: 'Maintain lean operations, pursue revenue early, and secure bridge funding' },
          { category: 'Team', risk: 'Difficulty attracting and retaining top engineering talent', probability: 6, impact: 6, mitigation: 'Offer equity compensation, remote-first culture, and compelling mission' },
          { category: 'Regulatory', risk: 'Changes in data privacy regulations affecting product functionality', probability: 4, impact: 7, mitigation: 'Build privacy-by-design architecture and stay ahead of compliance requirements' }
        ],
        criticalSuccessFactors: [
          'Achieve product-market fit within the first 12 months',
          'Build a defensible technical moat through proprietary data and algorithms',
          'Maintain a monthly burn rate under $75K during the seed stage',
          'Reach 500 paying customers before Series A fundraising'
        ],
        swot: {
          strengths: ['Innovative product approach', 'Strong founding team expertise', 'First-mover advantage in niche', 'Lean and agile development process'],
          weaknesses: ['Limited brand awareness', 'Small initial team size', 'No existing customer base', 'Capital constraints'],
          opportunities: ['Rapidly growing market segment', 'Partnerships with industry leaders', 'International expansion potential', 'AI/ML integration for competitive edge'],
          threats: ['Well-funded competitors', 'Economic downturn reducing investment', 'Technology platform risks', 'Client concentration risk']
        },
        overallRiskScore: calculateRiskScore([
          { probability: 6, impact: 8 },
          { probability: 5, impact: 7 },
          { probability: 7, impact: 7 },
          { probability: 5, impact: 9 },
          { probability: 6, impact: 6 },
          { probability: 4, impact: 7 }
        ])
      }
    };
  }

  // --- GTM Strategy (matches frontend GTMStrategy type) ---
  if (lowerPrompt.includes('go-to-market') || lowerPrompt.includes('gtm')) {
    return {
      gtmStrategy: {
        marketEntry: {
          geographicFocus: 'United States (major tech hubs: SF Bay Area, NYC, Austin)',
          initialSegment: 'Early-stage startups and solo founders (1-10 employees)',
          rationale: 'This segment has the highest urgency for the solution, fastest adoption cycles, and strong word-of-mouth potential within startup communities.'
        },
        acquisitionChannels: [
          { channel: 'Content Marketing & SEO', description: 'Create high-value blog posts, guides, and case studies targeting founder pain points', cadAssumption: '$15-$30 per lead', timeline: 'Month 1-3' },
          { channel: 'Product Hunt & Hacker News', description: 'Launch on startup-focused platforms for organic visibility and early adopter acquisition', cadAssumption: '$5-$10 per lead', timeline: 'Month 2' },
          { channel: 'LinkedIn Outbound', description: 'Targeted outreach to founders and startup operators with personalized messaging', cadAssumption: '$25-$50 per qualified lead', timeline: 'Month 2-4' },
          { channel: 'Paid Social (Meta, Twitter/X)', description: 'Retargeting campaigns and lookalike audiences based on early user profiles', cadAssumption: '$40-$80 per customer', timeline: 'Month 4-6' }
        ],
        priceStrategy: 'Freemium model with a generous free tier to drive adoption, a Pro plan at $29/mo for power users, and a Team plan at $79/mo for organizations. Annual billing offers 20% discount.',
        partnershipOpportunities: ['Startup accelerators and incubators', 'Venture capital firms', 'Coworking spaces', 'Business education platforms'],
        first90Days: [
          'Finalize MVP and onboard 50 beta testers for feedback',
          'Launch on Product Hunt and Hacker News for initial traction',
          'Publish 10+ SEO-optimized content pieces targeting key search terms',
          'Establish partnerships with 3 startup accelerators',
          'Set up analytics and customer feedback loops',
          'Achieve 200+ registered users and 30+ paying customers'
        ],
        metricsToTrack: ['Monthly Recurring Revenue (MRR)', 'Customer Acquisition Cost (CAC)', 'User Activation Rate', 'Net Promoter Score (NPS)', 'Weekly Active Users (WAU)', 'Churn Rate'],
        competitivePositioning: 'Position as the most accessible and AI-powered solution specifically built for early-stage founders, differentiating from expensive enterprise tools and generic business planning software.'
      }
    };
  }

  // --- Competitors (standalone) ---
  if (lowerPrompt.includes('competitors')) {
    return { competitors };
  }

  // --- Business Model (standalone) ---
  if (lowerPrompt.includes('business model')) {
    return { businessModel };
  }

  // --- Startup Score (standalone) ---
  if (lowerPrompt.includes('startup score') || lowerPrompt.includes('score the startup idea')) {
    return {
      score: {
        overall: 7.4,
        marketFit: 8.1,
        innovation: 7.0,
        feasibility: 6.8,
        scalability: 7.7,
        labels: ['Market Demand', 'Competition', 'Revenue', 'Risk'],
        values: [8.1, 6.8, 7.5, 6.4],
        summary: 'The idea shows strong market fit and good scalability with some execution risk.'
      }
    };
  }

  return defaultAnalysis;
}

// ─── Error & Retry Helpers ──────────────────────────────────────────────

function isRateLimitError(error) {
  const message = error.message?.toLowerCase() || '';
  return message.includes('429') ||
         message.includes('too many requests') ||
         message.includes('quota exceeded') ||
         message.includes('rate limit');
}

function isTemporaryError(error) {
  const message = error.message?.toLowerCase() || '';
  return message.includes('500') ||
         message.includes('502') ||
         message.includes('503') ||
         message.includes('504') ||
         message.includes('internal server error') ||
         message.includes('service unavailable');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getRetryDelay(error, attemptCount) {
  if (isRateLimitError(error)) {
    const retryMatch = error.message.match(/retry in (\d+\.?\d*)s/);
    if (retryMatch) {
      return parseFloat(retryMatch[1]) * 1000;
    }
    return Math.min(1000 * Math.pow(2, attemptCount), 30000);
  }
  return Math.min(500 * Math.pow(2, attemptCount), 5000);
}

async function tryService(serviceName, systemPrompt, userPrompt, maxRetries = 2) {
  const serviceFunction = SERVICE_FUNCTIONS[serviceName];
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      logger.info(`${serviceName} → Attempt ${attempt + 1}/${maxRetries + 1}`);

      const result = await serviceFunction(systemPrompt, userPrompt);

      rateLimitTracker[serviceName].consecutiveErrors = 0;
      rateLimitTracker[serviceName].lastError = null;

      return result;

    } catch (error) {
      lastError = error;
      logger.error(`${serviceName} Error (attempt ${attempt + 1}): ${error.message}`);

      if (isRateLimitError(error)) {
        rateLimitTracker[serviceName].lastError = error;
        rateLimitTracker[serviceName].consecutiveErrors++;
        logger.warn(`${serviceName} → Rate limited, skipping retries and going to next service`);
        break;
      }

      if (attempt < maxRetries) {
        const delay = getRetryDelay(error, attempt);
        logger.info(`${serviceName} → Retrying in ${delay}ms...`);
        await sleep(delay);
      }
    }
  }

  throw lastError;
}

// ─── Main AI Service Function ──────────────────────────────────────────────

export async function askAI(systemPrompt, userPrompt, options = {}) {
  const {
    preferredService = SERVICES.NVIDIA,
    maxRetries = 2,
    skipServices = []
  } = options;

  const serviceOrder = buildServiceOrder(preferredService, skipServices);

  if (serviceOrder.length === 0) {
    if (localFallbackEnabled()) {
      logger.warn('AI Service → No remote AI providers configured. Falling back to local development response.');
      return localAiFallback(systemPrompt, userPrompt);
    }
    throw new Error('No AI service is configured. Set NVIDIA_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY in Backend/.env');
  }

  let lastError;
  const triedServices = [];

  for (const serviceName of serviceOrder) {
    triedServices.push(serviceName);

    try {
      logger.info(`AI Service → Trying ${serviceName} (${triedServices.length}/${serviceOrder.length})`);
      return await tryService(serviceName, systemPrompt, userPrompt, maxRetries);

    } catch (error) {
      lastError = error;

      if (isRateLimitError(error)) {
        logger.warn(`${serviceName} → Rate limit hit`);
      } else if (isTemporaryError(error)) {
        logger.warn(`${serviceName} → Temporary error`);
      } else {
        logger.error(`${serviceName} → Unexpected error: ${error.message}`);
      }
    }
  }

  if (localFallbackEnabled()) {
    logger.warn('AI Service → Remote providers failed, using local development fallback response.');
    return localAiFallback(systemPrompt, userPrompt);
  }

  const errorMsg = `All AI services failed. Tried: ${triedServices.join(', ')}. Last error: ${lastError?.message || 'Unknown error'}`;
  logger.error(`AI Service → ${errorMsg}`);
  throw new Error(errorMsg);
}

export function getServiceStatus() {
  return Object.entries(rateLimitTracker).map(([service, status]) => ({
    service,
    consecutiveErrors: status.consecutiveErrors,
    lastErrorTime: status.lastError ? new Date().toISOString() : null,
    isRateLimited: status.consecutiveErrors >= 3
  }));
}

export function resetRateLimits() {
  Object.values(rateLimitTracker).forEach(status => {
    status.consecutiveErrors = 0;
    status.lastError = null;
  });
  logger.info('AI Service → Rate limit tracking reset');
}

// ─── Public API ────────────────────────────────────────────────────────────────

/** Build a context string from the idea payload */
function ideaContext({ idea, industry, targetMarket }) {
  let ctx = `Startup Idea: ${idea}`;
  if (industry) ctx += `\nIndustry: ${industry}`;
  if (targetMarket) ctx += `\nTarget Market: ${targetMarket}`;
  return ctx;
}

export async function analyzeIdea(idea) {
  logger.info("AI → analyzeIdea");
  return askAI(
    `You are a world-class startup strategy consultant and venture capitalist. 
Analyze the following startup idea with extreme depth. Move beyond generic descriptions to identify specific market gaps and friction points.

Return a JSON object with this exact structure:
{
  "analysis": [
    {
      "title": "Problem & Target Audience",
      "description": "Deep-dive into the specific 'hair on fire' problem. Who exactly is the user, and why does existing software/behavior fail them?",
      "score": 8.5,
      "details": ["Specific demographic insight", "Quantifiable pain point", "Adoption catalyst"]
    },
    {
      "title": "Market Opportunity",
      "description": "Analysis of the current market paradigm. Is this a blue ocean or a saturated market with a wedge opportunity?",
      "score": 7.8,
      "details": ["Market tailwinds (e.g., regulatory, tech)", "Macro-economic relevance"]
    },
    {
      "title": "Unique Value Proposition",
      "description": "Explain the '10x better' factor. How does this specifically create a defensible moat (network effects, data, or switching costs)?",
      "score": 8.0,
      "details": ["Specific feature differentiator", "Defensibility strategy"]
    },
    {
      "title": "Business Model Viability",
      "description": "Deep analysis of the unit economics and path to profitability. What is the flywheel effect here?",
      "score": 7.5,
      "details": ["Revenue scalability factor", "LTV/CAC potential"]
    }
  ]
}
Scores should be between 1 and 10. Be data-driven, critical, and insightful. Avoid corporate fluff.`,
    ideaContext(idea)
  );
}

export async function getCompetitors(idea) {
  logger.info("AI → getCompetitors");
  return askAI(
    `You are a competitive intelligence expert. Identify 4-6 real competitors for the following startup idea. Return a JSON object with this exact structure:
{
  "competitors": [
    {
      "name": "Company Name",
      "strengths": ["strength 1", "strength 2"],
      "weaknesses": ["weakness 1", "weakness 2"]
    }
  ]
}
Use real companies when possible. Be specific and accurate.`,
    ideaContext(idea)
  );
}

export async function getBusinessModel(idea) {
  logger.info("AI → getBusinessModel");
  return askAI(
    `You are a business strategy consultant. Suggest the best business model for the following startup idea. Return a JSON object with this exact structure:
{
  "businessModel": {
    "type": "e.g. Freemium SaaS",
    "description": "detailed description of the recommended business model",
    "revenueStreams": ["stream 1", "stream 2", "stream 3"],
    "pricingStrategy": "description of pricing tiers",
    "unitEconomics": "brief unit economics overview"
  }
}
Be specific with numbers and percentages where possible.`,
    ideaContext(idea)
  );
}

export async function getRoadmap(idea) {
  logger.info("AI → getRoadmap");
  return askAI(
    `You are a product strategy expert. Create a product roadmap for the following startup idea. Return a JSON object with this exact structure:
{
  "roadmap": {
    "phases": [
      {
        "name": "Phase 1: MVP",
        "duration": "2–3 months",
        "goals": ["goal 1", "goal 2"],
        "features": ["feature 1", "feature 2"]
      },
      {
        "name": "Phase 2: Growth",
        "duration": "3–6 months",
        "goals": ["goal 1"],
        "features": ["feature 1", "feature 2"]
      },
      {
        "name": "Phase 3: Scale",
        "duration": "6–12 months",
        "goals": ["goal 1"],
        "features": ["feature 1", "feature 2"]
      }
    ]
  }
}
Be actionable and realistic.`,
    ideaContext(idea)
  );
}

export async function getPitch(idea) {
  logger.info("AI → getPitch");
  return askAI(
    `You are an expert pitch-deck writer who has helped founders raise millions. Generate a compelling investor pitch for the following startup idea. Return a JSON object with this exact structure:
{
  "pitch": {
    "title": "Startup Name – Tagline",
    "sections": [
      { "heading": "Problem", "content": "paragraph" },
      { "heading": "Solution", "content": "paragraph" },
      { "heading": "Market Size", "content": "paragraph with TAM/SAM/SOM" },
      { "heading": "Business Model", "content": "paragraph" },
      { "heading": "Traction", "content": "paragraph" },
      { "heading": "Ask", "content": "paragraph" }
    ]
  }
}
Make it compelling, data-driven, and investor-ready.`,
    ideaContext(idea)
  );
}

export async function getStartupScore(idea) {
  logger.info("AI → getStartupScore");
  return askAI(
    `You are a startup evaluation expert. Score the following startup idea across key dimensions. Return a JSON object with this exact structure:
{
  "score": {
    "overall": 7.6,
    "marketFit": 8.2,
    "innovation": 7.0,
    "feasibility": 6.5,
    "scalability": 8.0,
    "labels": ["Market Demand", "Competition Level", "Revenue Potential", "Technical Difficulty"],
    "values": [8.2, 6.5, 7.8, 5.4],
    "summary": "brief overall assessment paragraph"
  }
}
All scores should be between 1 and 10 (decimals OK). Be honest and data-driven.`,
    ideaContext(idea)
  );
}

/**
 * Market Potential — MUST match frontend MarketPotential type:
 * { tamSamSom: { tam, sam, som }, marketGrowthRate, marketTrends[], targetDemographics: { primary[], secondary[] }, marketPenetrationStrategy, marketRisks[], opportunities[] }
 */
export async function getMarketPotential(idea) {
  logger.info("AI → getMarketPotential");
  return askAI(
    `You are a senior market research analyst at a top-tier VC firm.
Perform a data-driven market potential analysis for the following idea.
For TAM/SAM/SOM, use logical 'Bottom-up' estimates (e.g., Number of customers * Average Contract Value).

Return a JSON object with this exact structure:
{
  "marketPotential": {
    "tamSamSom": {
      "tam": "$X.XB (Total addressable global market size)",
      "sam": "$XXM (Serviceable portion based on current tech/area)",
      "som": "$XM (Targeted portion for first 2 years)"
    },
    "marketGrowthRate": "X% CAGR with reasoning (e.g., powered by AI adoption)",
    "marketTrends": [
      "Specific, non-obvious industry shift",
      "Quantifiable consumer behavior change",
      "Technological or regulatory tailwind"
    ],
    "targetDemographics": {
      "primary": ["Specific user profile with job title/age", "Behavioral trait"],
      "secondary": ["Edge cases", "Tertiary beneficiaries"]
    },
    "marketPenetrationStrategy": "A sophisticated 'Land and Expand' or 'Niche-first' strategy description.",
    "marketRisks": ["Specific market barrier", "Incumbent response risk", "Adoption friction"],
    "opportunities": ["Adjacent market expansion", "Data monetization possibility", "B2B partnership potential"]
  }
}
Be realistic, use professional terminology, and avoid over-optimistic generalizations.`,
    ideaContext(idea)
  );
}

/**
 * Tech Stack — MUST match frontend TechStackData type:
 * { techStack: { frontend: string[], backend: string[], database: string[], infrastructure: string[], thirdPartyServices: string[], developmentTools: string[] },
 *   scopes: { phase1MVP: { scope, technologies[], estimatedDevelopmentTime }, phase2Growth: {...}, phase3Scale: {...} },
 *   infrastructureNeeds: { hosting, scalability, security, monitoring } }
 */
export async function getTechStackAndDependencies(idea) {
  logger.info("AI → getTechStackAndDependencies");
  return askAI(
    `You are a CTO and Senior Software Architect. 
Recommend a modern, scalable, and cost-effective technology stack. 
Provide architectural reasoning for your choices (e.g., 'chosen for its real-time capabilities' or 'to minimize devops overhead').

Return a JSON object with this exact structure:
{
  "techStack": {
    "frontend": ["React/Next.js (with reason)", "Tailwind", "Lucide Icons"],
    "backend": ["Node.js/Go/Python (with reason)", "FastAPI/Express"],
    "database": ["PostgreSQL/MongoDB (with reason)", "Redis for caching"],
    "infrastructure": ["AWS/Vercel/DigitalOcean (with reason)", "Docker"],
    "thirdPartyServices": ["Stripe (Payments)", "Postmark (Email)", "Sentry (Monitoring)"],
    "developmentTools": ["GitHub Actions (CI/CD)", "Jest/Cypress (Testing)"]
  },
  "scopes": {
    "phase1MVP": {
      "scope": "Core 'Must-have' features to prove the UVP.",
      "technologies": ["List 3-4 core technologies"],
      "estimatedDevelopmentTime": "X-Y weeks"
    },
    "phase2Growth": {
      "scope": "Growth levers and analytics integration.",
      "technologies": ["Additional scaling tools"],
      "estimatedDevelopmentTime": "X-Y weeks"
    },
    "phase3Scale": {
      "scope": "Enterprise readiness and automation.",
      "technologies": ["High-availability tools"],
      "estimatedDevelopmentTime": "X-Y weeks"
    }
  },
  "infrastructureNeeds": {
    "hosting": "Reasoned hosting choice (e.g. Serverless for low early costs)",
    "scalability": "Vertical vs Horizontal scaling approach",
    "security": "Critical security measures (e.g. JWT, Encryption-at-rest)",
    "monitoring": "Observability stack (Logs, Metrics, Traces)"
  }
}
IMPORTANT: Categories MUST be arrays of strings. Be technically precise.`,
    ideaContext(idea)
  );
}

/**
 * Funding — MUST match frontend FundingData type:
 * { fundingRequirements: { seed: { amount, timeframe, uses[] }, seriesA: { amount, timeframe, uses[] } },
 *   burnRate: { monthlyBurn, runway, breakEvenTimeline },
 *   teamComposition: [{ role, salary, timing }],
 *   keyExpenses: { personnel, infrastructure, marketing, operations },
 *   fundingStrategy: string }
 */
export async function getFundingRequirements(idea) {
  logger.info("AI → getFundingRequirements");
  return askAI(
    `You are a Venture Capital partner specializing in Series A/B investments.
Provide a realistic financial roadmap including seed and scaling capital.

Return a JSON object with this exact structure:
{
  "fundingRequirements": {
    "seed": {
      "amount": "$X - $YM",
      "timeframe": "X months to reach core milestones",
      "uses": ["Specific allocation (e.g., 50% for 3 Full-stack engineers)", "Marketing spend logic", "Ops"]
    },
    "seriesA": {
      "amount": "$X - $YM",
      "timeframe": "Conditions to trigger Series A",
      "uses": ["Scaling strategy", "Regional expansion", "Deep tech investment"]
    }
  },
  "burnRate": {
    "monthlyBurn": "$X - $YK (Monthly operating cost)",
    "runway": "X months assuming Seed target is met",
    "breakEvenTimeline": "Realistic month count based on acquisition cost"
  },
  "teamComposition": [
    { "role": "Specific role (e.g., Full Stack Engineer)", "salary": "$XK-$YK", "timing": "Specific month hire" },
    { "role": "Role (e.g. Growth Lead)", "salary": "$XK-$YK", "timing": "Specific month hire" }
  ],
  "keyExpenses": {
    "personnel": "X% of total budget (with reasoning)",
    "infrastructure": "X% of budget",
    "marketing": "X% of budget",
    "operations": "X% of budget"
  },
  "fundingStrategy": "A sophisticated narrative on bootstrapping vs pre-seed, which VCs to target, and what metric (MRR/Users) to show before the pitch."
}
Ensure the numbers are consistent (e.g. team salaries + marketing should roughly equal burn rate).`,
    ideaContext(idea)
  );
}

/**
 * Risk Assessment — MUST match frontend RiskAssessmentData type:
 * { riskAssessment: {
 *     risks: [{ category, risk, probability: number, impact: number, mitigation }],
 *     criticalSuccessFactors: string[],
 *     swot: { strengths[], weaknesses[], opportunities[], threats[] },
 *     overallRiskScore: number } }
 */
export async function getRiskAssessment(idea) {
  logger.info("AI → getRiskAssessment");
  const result = await askAI(
    `You are a risk management consultant for high-growth tech ventures.
Identify the most critical risks that could kill this startup in its first 18 months.
Provide specific, non-generic mitigation strategies.

Return a JSON object with this exact structure:
{
  "riskAssessment": {
    "risks": [
      {
        "category": "Market/Tech/Financial/Team",
        "risk": "A highly specific risk (e.g. 'API dependency on Twitter causing platform risk')",
        "probability": 7,
        "impact": 9,
        "mitigation": "An actionable mitigation step a founder can take today."
      }
    ],
    "criticalSuccessFactors": [
      "The single most important metric to hit",
      "A technical milestone",
      "A key hire or partnership"
    ],
    "swot": {
      "strengths": ["Internal advantage"],
      "weaknesses": ["Internal limitation"],
      "opportunities": ["External catalyst"],
      "threats": ["External blocker"]
    },
    "overallRiskScore": 6.5
  }
}
Provide 5-7 distinct risks. Score probability and impact from 1-10.`,
    ideaContext(idea)
  );

  // Calculate real score based on P*I
  if (result.riskAssessment && result.riskAssessment.risks) {
    result.riskAssessment.overallRiskScore = calculateRiskScore(result.riskAssessment.risks);
  }
  
  return result;
}

/**
 * GTM Strategy — MUST match frontend GTMStrategy type:
 * { gtmStrategy: {
 *     marketEntry: { geographicFocus, initialSegment, rationale },
 *     acquisitionChannels: [{ channel, description, cadAssumption, timeline }],
 *     priceStrategy: string,
 *     partnershipOpportunities: string[],
 *     first90Days: string[],
 *     metricsToTrack: string[],
 *     competitivePositioning: string } }
 */
export async function getGTMStrategy(idea) {
  logger.info("AI → getGTMStrategy");
  return askAI(
    `You are a go-to-market specialist who helped scale unicorns. 
Design a high-velocity GTM strategy that focuses on low CAC and high organic reach.

Return a JSON object with this exact structure:
{
  "gtmStrategy": {
    "marketEntry": {
      "geographicFocus": "Primary location or 'Global/Remote'",
      "initialSegment": "The high-intent 'wedge' customer group",
      "rationale": "Clear logical backup for choosing this segment first."
    },
    "acquisitionChannels": [
      {
        "channel": "e.g., Content Engines / SEO / Direct Sales",
        "description": "Specific execution detail",
        "cadAssumption": "Quantifiable CAC estimate reasoning",
        "timeline": "Launch phase (e.g. Month 1-2)"
      }
    ],
    "priceStrategy": "A sophisticated narrative on value-based vs cost-plus pricing, and tiering logic.",
    "partnershipOpportunities": ["Specific brand or company type to partner with"],
    "first90Days": [
      "Week 1-4: Actionable milestone",
      "Week 5-8: Growth milestone",
      "Week 9-12: Revenue/Scale milestone"
    ],
    "metricsToTrack": ["NRR (Net Revenue Retention)", "LTV/CAC Ratio", "Virality Coefficient"],
    "competitivePositioning": "How to anchor against the biggest incumbent in the space."
  }
}
Be aggressive, realistic, and highly actionable.`,
    ideaContext(idea)
  );
}

export async function getCompleteDashboardData(idea) {
  logger.info("AI → getCompleteDashboardData (Unified Call)");
  const result = await askAI(
    `You are an elite startup consultant and venture capitalist.
Analyze the following startup idea comprehensively and return a SINGLE JSON object with the exact structure below.

CRITICAL: You must return ONLY valid JSON. Accuracy and depth are paramount.

JSON Structure:
{
  "analysis": {
    "analysis": [
      {
        "title": "Problem & Target Audience",
        "description": "...",
        "score": 8.5,
        "details": ["...", "..."]
      },
      {
        "title": "Market Opportunity",
        "description": "...",
        "score": 7.8,
        "details": ["...", "..."]
      },
      {
        "title": "Unique Value Proposition",
        "description": "...",
        "score": 8.0,
        "details": ["...", "..."]
      },
      {
        "title": "Business Model Viability",
        "description": "...",
        "score": 7.5,
        "details": ["...", "..."]
      }
    ]
  },
  "competitors": {
    "competitors": [
      {
        "name": "Company Name",
        "strengths": ["strength 1", "strength 2"],
        "weaknesses": ["weakness 1", "weakness 2"]
      }
    ]
  },
  "businessModel": {
    "businessModel": {
      "type": "e.g. Freemium SaaS",
      "description": "detailed description",
      "revenueStreams": ["stream 1", "stream 2"],
      "pricingStrategy": "pricing description",
      "unitEconomics": "economics overview"
    }
  },
  "score": {
    "score": {
      "overall": 7.6,
      "marketFit": 8.2,
      "innovation": 7.0,
      "feasibility": 6.5,
      "scalability": 8.0,
      "labels": ["Market Demand", "Competition Level", "Revenue Potential", "Technical Difficulty"],
      "values": [8.2, 6.5, 7.8, 5.4],
      "summary": "brief overall assessment"
    }
  },
  "riskAssessment": {
    "risks": [
      {
        "category": "Market/Tech/Financial/Team",
        "risk": "...",
        "probability": 7,
        "impact": 9,
        "mitigation": "..."
      }
    ],
    "overallRiskScore": 0,
    "swot": { "strengths": [], "weaknesses": [], "opportunities": [], "threats": [] },
    "criticalSuccessFactors": []
  }
}
Provide comprehensive, accurate analysis for each section.`,
    ideaContext(idea)
  );

  // Recalculate nested risk score
  if (result.riskAssessment && result.riskAssessment.risks) {
    result.riskAssessment.overallRiskScore = calculateRiskScore(result.riskAssessment.risks);
  }

  return result;
}