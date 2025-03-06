import API from "./axios-client";
import { CurrentUserResponseType } from "@/types/api.type";

export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await API.post("/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};


export const register = async (data: { name: string; email: string; password: string }) => {
  try {
    const response = await API.post("/auth/register", data); 
    return response.data; 
  } catch (error) {
    console.error("Registration failed:", error);
    throw error; 
  }
};
export const logout = async () => {};

export const getCurrentUser =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };