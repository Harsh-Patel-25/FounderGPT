export interface ApiResponse<T = unknown> {
  status: string;
  message: string;
  data?: T;
}

export interface StartupIdea {
  idea: string;
  industry?: string;
  targetMarket?: string;
}

export interface AnalysisResult {
  title: string;
  description: string;
  score: number;
  details: string[];
}

export interface CompetitorInsight {
  name: string;
  strengths: string[];
  weaknesses: string[];
}

export interface BusinessModel {
  type: string;
  description: string;
  revenueStreams: string[];
  pricingStrategy?: string;
  unitEconomics?: string;
}

export interface StartupScore {
  overall: number;
  marketFit: number;
  innovation: number;
  feasibility: number;
  scalability: number;
  labels: string[];
  values: number[];
  summary: string;
}

export interface DashboardData {
  analysis: { analysis: AnalysisResult[] };
  competitors: { competitors: CompetitorInsight[] };
  businessModel: { businessModel: BusinessModel };
  score: { score: StartupScore };
}

export interface PitchSection {
  heading: string;
  content: string;
}

export interface PitchDeck {
  title: string;
  sections: PitchSection[];
}

export interface MarketPotential {
  tamSamSom: {
    tam: string;
    sam: string;
    som: string;
  };
  marketGrowthRate: string;
  marketTrends: string[];
  targetDemographics: {
    primary: string[];
    secondary: string[];
  };
  marketPenetrationStrategy: string;
  marketRisks: string[];
  opportunities: string[];
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  infrastructure: string[];
  thirdPartyServices: string[];
  developmentTools: string[];
}

export interface Roadmap {
  name: string;
  duration: string;
  goals: string[];
  features: string[];
}

export interface TechStackData {
  techStack: TechStack;
  scopes: {
    phase1MVP: {
      scope: string;
      technologies: string[];
      estimatedDevelopmentTime: string;
    };
    phase2Growth: {
      scope: string;
      technologies: string[];
      estimatedDevelopmentTime: string;
    };
    phase3Scale: {
      scope: string;
      technologies: string[];
      estimatedDevelopmentTime: string;
    };
  };
  infrastructureNeeds: {
    hosting: string;
    scalability: string;
    security: string;
    monitoring: string;
  };
}

export interface FundingData {
  fundingRequirements: {
    seed: {
      amount: string;
      timeframe: string;
      uses: string[];
    };
    seriesA: {
      amount: string;
      timeframe: string;
      uses: string[];
    };
  };
  burnRate: {
    monthlyBurn: string;
    runway: string;
    breakEvenTimeline: string;
  };
  teamComposition: Array<{
    role: string;
    salary: string;
    timing: string;
  }>;
  keyExpenses: {
    personnel: string;
    infrastructure: string;
    marketing: string;
    operations: string;
  };
  fundingStrategy: string;
}

export interface Risk {
  category: string;
  risk: string;
  probability: number;
  impact: number;
  mitigation: string;
}

export interface RiskAssessmentData {
  riskAssessment: {
    risks: Risk[];
    criticalSuccessFactors: string[];
    swot: {
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    overallRiskScore: number;
  };
}

export interface GTMStrategy {
  marketEntry: {
    geographicFocus: string;
    initialSegment: string;
    rationale: string;
  };
  acquisitionChannels: Array<{
    channel: string;
    description: string;
    cadAssumption: string;
    timeline: string;
  }>;
  priceStrategy: string;
  partnershipOpportunities: string[];
  first90Days: string[];
  metricsToTrack: string[];
  competitivePositioning: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  abstract: string;
  year?: number;
  citationCount: number;
  authors: string[];
  venue: string;
  source: string;
  url: string;
}

export interface ResearchAnalysis {
  research_summary: string;
  trends: string[];
  improvements: string[];
  advanced_idea: string;
}

export interface ResearchData {
  papers: ResearchPaper[];
  analysis: ResearchAnalysis;
}
