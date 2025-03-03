import API from "./axios-client";
import { CurrentUserResponseType } from "@/types/api.type";

export const loginMutationFn = async () => {};

export const registerMutationFn = async () => {};

export const logoutMutationFn = async () => {};

export const getCurrentUserQueryFn =
  async (): Promise<CurrentUserResponseType> => {
    const response = await API.get(`/user/current`);
    return response.data;
  };