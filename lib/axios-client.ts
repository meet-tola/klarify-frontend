import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = axios.create({
  baseURL,
  withCredentials: true,
});

// Attach token to request headers if it exists in localStorage
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle network errors or canceled requests
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn("Network error or request was canceled.");
    }
    return Promise.reject(error);
  }
);

export default API;
