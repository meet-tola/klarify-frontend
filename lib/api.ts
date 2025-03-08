import API from "./axios-client";
import { CurrentUserResponseType } from "@/types/api.type";

const handleError = (error: any) => {
  throw error.response?.data || { message: "Something went wrong. Please try again." };
};

const postRequest = async (url: string, data?: any) => {
  try {
    const response = await API.post(url, data);
    return response.data;
  } catch (error: any) {
    handleError(error);
  }
};

export const register = async (data: { name: string; email: string; password: string }) => 
  postRequest("/auth/register", data);

export const verifyEmail = async (data: { code: string }) => 
  postRequest("/auth/verify-email", data);

export const resendVerificationCode = async () => 
  postRequest("/auth/resend-verification-code");

export const resetPassword = async (data: { newPassword: string }) => 
  postRequest("/auth/reset-password", data);

export const login = async (data: { email: string; password: string }) => 
  postRequest("/auth/login", data);

export const logout = async () => 
  postRequest("/auth/logout");

export const getCurrentUser = async (): Promise<CurrentUserResponseType | undefined> => {
  try {
    const response = await API.get(`/user/current`, { withCredentials: true });
    return response.data;
  } catch (error: any) {
    handleError(error);
    return undefined;
  }
};
