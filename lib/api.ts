import API from "./axios-client";
import { CurrentUserResponseType } from "@/types/api.type";

const handleError = (error: any) => {
  throw error.response?.data || { message: "Something went wrong. Please try again." };
};

export const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await API.post("/auth/register", data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const verifyEmail = async (data: { email: string; code: string }) => {
  try {
    const response = await API.post("/auth/verify-email", data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const response = await API.post("/auth/logout");
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const getCurrentUser = async (): Promise<CurrentUserResponseType | undefined> => {
  try {
    const response = await API.get(`/user/current`, { withCredentials: true }); // Include credentials
    return response.data;
  } catch (error: any) {
    console.error("Error fetching current user:", {
      message: error.message,
      response: error.response?.data, // Log server response if available
      status: error.response?.status, // HTTP status code
    });
    handleError(error);
    return undefined;
  }
};


