import axios from "axios";
import type { 
  ApiResponse, 
  StartupIdea, 
  StartupScore, 
  DashboardData,
  MarketPotential,
  TechStackData,
  FundingData,
  RiskAssessmentData,
  GTMStrategy,
  ResearchData
} from "@/types";

// Normalize the API URL — ensure it ends with /api
const rawUrl = import.meta.env.VITE_API_URL || "http://localhost:4999/api";
const API_URL = rawUrl.endsWith("/api") ? rawUrl : `${rawUrl.replace(/\/+$/, "")}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 120000, // Increased for longer AI analysis calls
});

// Request interceptor for auth tokens
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Core Analysis Endpoints
export const analyzeIdea = (idea: StartupIdea) => api.post<ApiResponse>("/analyze", idea);
export const getCompetitors = (idea: StartupIdea) => api.post<ApiResponse>("/competitors", idea);
export const getBusinessModel = (idea: StartupIdea) => api.post<ApiResponse>("/business-model", idea);
export const getRoadmap = (idea: StartupIdea) => api.post<ApiResponse>("/roadmap", idea);
export const getPitch = (idea: StartupIdea) => api.post<ApiResponse>("/pitch", idea);
export const getStartupScore = (idea: StartupIdea) => api.post<ApiResponse<StartupScore>>("/startup-score", idea);
export const getDashboard = (idea: StartupIdea) => api.post<ApiResponse<DashboardData>>("/dashboard", idea);

// New Advanced Analysis Endpoints
export const getMarketPotential = (idea: StartupIdea) => 
  api.post<ApiResponse<{ marketPotential: MarketPotential }>>("/market-potential", idea);

export const getTechStack = (idea: StartupIdea) => 
  api.post<ApiResponse<TechStackData>>("/tech-stack", idea);

export const getFunding = (idea: StartupIdea) => 
  api.post<ApiResponse<FundingData>>("/funding", idea);

export const getRiskAssessment = (idea: StartupIdea) => 
  api.post<ApiResponse<RiskAssessmentData>>("/risk-assessment", idea);

export const getGTMStrategy = (idea: StartupIdea) => 
  api.post<ApiResponse<{ gtmStrategy: GTMStrategy }>>("/gtm-strategy", idea);

// Research Intelligence Agent
export const getResearchAnalysis = (idea: StartupIdea, options?: { bypassCache?: boolean; skipSLM?: boolean }) => 
  api.post<ApiResponse<ResearchData>>("/research/analyze", { ...idea, ...options });

// Authentication Endpoints
export const login = (data: any) => api.post("/auth/login", data);
export const register = (data: any) => api.post("/auth/register", data);
export const getMe = () => api.get("/auth/me");
export const forgotPassword = (email: string) => api.post("/auth/forgot-password", { email });
export const resetPassword = (token: string, data: any) => api.post(`/auth/reset-password/${token}`, data);
export const updateProfile = (data: { fullName: string }) => api.put("/auth/profile", data);
export const changePassword = (data: any) => api.put("/auth/change-password", data);
export const deleteAccount = () => api.delete("/auth/me");

export default api;


