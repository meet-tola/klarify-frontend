import API from "./axios-client";
import { CurrentUserResponseType } from "@/types/api.type";

// Helper function to handle errors
const handleError = (error: any) => {
  throw error.response?.data || { message: "Something went wrong. Please try again." };
};

// Helper function for POST requests
const postRequest = async (url: string, data?: any) => {
  try {
    const response = await API.post(url, data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Helper function for authenticated GET requests
const getRequest = async (url: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await API.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// Helper function to set the token in storage
const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Helper function to clear the token from storage
const clearToken = () => {
  localStorage.removeItem("token"); 
};

// AUTH AND CURRENT USERS

export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await postRequest("/auth/register", data);
  setToken(response.accessToken); 
  return response;
};

export const verifyEmail = async (data: { code: string }) => {
  const response = await postRequest("/auth/verify-email", data);
  setToken(response.token);
  return response;
};

export const resendVerificationCode = async () => {
  return postRequest("/auth/resend-verification-code");
};

export const resetPassword = async (data: { newPassword: string }) => {
  return postRequest("/auth/reset-password", data);
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await API.post("/auth/login", data);
    setToken(response.data.accessToken);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const logout = async () => {
  clearToken(); 
  return postRequest("/auth/logout");
};


export const getCurrentUser = async (): Promise<CurrentUserResponseType | undefined> => {
  try {
    const response = await API.get(`/user/current`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    handleError(error);
    return undefined;
  }
};

// SKILL ASSESSMENT
export const getSkillQuestions = async (userId: string) => {
  try {
    const response = await API.get(`skills/${userId}/skill-questions`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const saveSkillsAssessment = async (userId: string, answers: { questionId: string; answer: string }[]) => {
  try {
    const response = await API.post(`/skills/${userId}/save-skills-assessment`, { answers });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getSuggestedSkills = async (userId: string) => {
  try {
    const response = await API.get(`skills/${userId}/suggested-skills`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const selectSkill = async (userId: string, pickedSkill: string) => {
  try {
    const response = await API.post(`skills/${userId}/select-skill`, { pickedSkill });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const searchSkills = async (query?: string) => {
  try {
    const response = await API.get("/skills/search-skills", {
      params: { query }, 
    });
    return response.data;
  } catch (error) {
    console.error("Error searching skills:", error);
    throw error;
  }
};

export const selectSkillFromSearch = async (userId: string, pickedSkill: string) => {
  try {
    const response = await API.post(`/skills/${userId}/select-skill-from-search`, {
      pickedSkill,
    });
    return response.data;
  } catch (error) {
    console.error("Error selecting skill:", error);
    throw error;
  }
};

// CAREER QUESTIONS AND EVALUATION
export const getCareerQuestions = async (userId: string) => {
  try {
    const response = await API.get(`/career/${userId}/career-questions`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const evaluateCareerAnswers = async (userId: string, answers: { questionId: string; answer: string }[]) => {
  try {
    const response = await API.post(`/career/${userId}/evaluate-career`, { answers });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

// LEARNING & ROADMAP
export const getRoadmap = async (userId: string) => {
  try {
    const response = await API.get(`/roadmap/${userId}/roadmap`);
    return response.data.roadmaps[0];
  } catch (error: any) {
    handleError(error);
  }
};

export const getRoadmapContent = async (userId: string) => {
  try {
    const response = await API.post(`/roadmap/${userId}/content`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};