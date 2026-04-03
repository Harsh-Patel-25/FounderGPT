import axios from "axios";
import type { ApiResponse, StartupIdea } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// Request interceptor for auth tokens (ready for future use)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
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

export const analyzeIdea = (idea: StartupIdea) =>
  api.post<ApiResponse>("/api/analyze", idea);

export const getCompetitors = (idea: StartupIdea) =>
  api.post<ApiResponse>("/api/competitors", idea);

export const getBusinessModel = (idea: StartupIdea) =>
  api.post<ApiResponse>("/api/business-model", idea);

export const getRoadmap = (idea: StartupIdea) =>
  api.post<ApiResponse>("/api/roadmap", idea);

export const getPitch = (idea: StartupIdea) =>
  api.post<ApiResponse>("/api/pitch", idea);

export const getStartupScore = (idea: StartupIdea) =>
  api.post<ApiResponse>("/api/startup-score", idea);

export default api;
