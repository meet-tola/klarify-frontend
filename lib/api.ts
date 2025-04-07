import API from "./axios-client";
import { CurrentUserResponseType, GoalType, UpdateGoalType } from "@/types/api.type";

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

// AUTH AND CURRENT USERS

export const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await API.post("/auth/register", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const verifyEmail = async (data: { code: string }) => {
  const response = await postRequest("/auth/verify-email", data);
  return response;
};

export const resendVerificationCode = async () => {
  return postRequest("/auth/resend-verification-code");
};

export const requestPasswordReset = async (data: { email: string }) => {
  return postRequest("/auth/request-password-reset", data);
};
export const validateResetToken = async (token: string) => {
  try {
    const response = await API.get(`/auth/validate-reset-token/${token}`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const completePasswordReset  = async (data: { token: string, newPassword: string }) => {
  return postRequest("/auth/complete-password-reset", data);
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await API.post("/auth/login", data);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const logout = async () => {
  localStorage.removeItem("token");
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

export const selectedSearchSkill = async (userId: string, pickedSkill: string) => {
  try {
    const response = await API.post(`/skills/${userId}/selected-search-skill`, {
      pickedSkill,
    });
    return response.data;
  } catch (error) {
    console.error("Error selecting skill:", error);
    throw error;
  }
};

export const clearUserSkills = async (userId: string) => {
  try {
    const response = await API.put(`skills/${userId}/clear-skills`);
    return response.data;
  } catch (error: any) {
    handleError(error);
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

export const generateRoadmapContent = async (userId: string) => {
  try {
    const response = await API.post(`/roadmap/${userId}/content`);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const generateRoadmapSectionContent = async (userId: string, roadmapId: string, phaseIndex: number = 0) => {
  try {
    const response = await API.post(`/roadmap/${userId}/sections`, {
      roadmapId,
      phaseIndex
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getRoadmapContent = async (userId: string, pickedSkill: string) => {
  try {
    const response = await API.post(`/roadmap/${userId}/learning-path`, {
      pickedSkill,
    });
    return response.data;
  } catch (error) {
    console.error("Error selecting skill:", error);
    throw error;
  }
};

export const createGoal = async (userId: string, goalData: GoalType) => {
  try {
    const response = await API.post(`/goals/${userId}`, goalData);
    return response.data;
  } catch (error) {
    console.error("Create goal failed:", error);
    throw error;
  }
};

export const updateGoal = async (goalId: string, updates: UpdateGoalType) => {
  try {
    const response = await API.put(`/goals/${goalId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Update goal failed:", error);
    throw error;
  }
};

export const deleteGoal = async (goalId: string) => {
  try {
    const response = await API.delete(`/goals/${goalId}`);
    return response.data;
  } catch (error) {
    console.error("Delete goal failed:", error);
    throw error;
  }
};

export const getUserGoals = async (userId: string) => {
  try {
    const response = await API.get(`/goals/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get user goals failed:", error);
    throw error;
  }
};

export const getGoalProgress = async (goalId: string) => {
  try {
    const response = await API.get(`/goals/progress/${goalId}`);
    return response.data;
  } catch (error) {
    console.error("Get goal progress failed:", error);
    throw error;
  }
};

export const updateGoalProgress = async (goalId: string, increment: number = 1) => {
  try {
    const response = await API.post(`/goals/progress/${goalId}`, { increment });
    return response.data;
  } catch (error) {
    console.error("Update goal progress failed:", error);
    throw error;
  }
};

export const getInAppReminders = async (userId: string) => {
  try {
    const response = await API.get(`/goals/in-app-reminders/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Get in-app reminders failed:", error);
    throw error;
  }
};

export const markReminderAsRead = async (goalId: string) => {
  try {
    const response = await API.post(`/goals/reminders/${goalId}/mark-as-read`);
    return response.data;
  } catch (error) {
    console.error("Mark reminder as read failed:", error);
    throw error;
  }
};

// Additional utility functions
export const calculateGoalProgress = (current: number, target: number) => {
  return Math.min(100, Math.round((current / target) * 100));
};

export const getDaysRemaining = (endDate: Date) => {
  const now = new Date();
  return Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
};