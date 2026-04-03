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
  score?: number;
  details?: string[];
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
}

export interface StartupScore {
  overall: number;
  marketFit: number;
  innovation: number;
  feasibility: number;
  scalability: number;
}

export interface PitchDeck {
  title: string;
  sections: { heading: string; content: string }[];
}
