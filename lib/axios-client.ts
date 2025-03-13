import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = axios.create({
  baseURL,
  withCredentials: true,
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