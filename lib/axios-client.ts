import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API = axios.create({ baseURL });

// Function to get token from sessionStorage
const getToken = () => (typeof window !== "undefined" ? sessionStorage.getItem("token") : null);

// Function to save token securely
const saveToken = (token: string) => sessionStorage.setItem("token", token);

// Function to remove token
const removeToken = () => sessionStorage.removeItem("token");

// Attach token to requests
API.interceptors.request.use(
  async (config) => {
    let token = getToken();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors & refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.get(`${baseURL}/auth/refresh`, { withCredentials: true });

        if (data.accessToken) {
          saveToken(data.accessToken);
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
          return API(originalRequest);
        }
      } catch (refreshError) {
        removeToken();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
