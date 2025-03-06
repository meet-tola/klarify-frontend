import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const options = {
  baseURL,
  withCredentials: true,
  timeout: 10000,
};

const API = axios.create(options);

API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      const { data, status } = error.response;
      if (data === "Unauthorized" && status === 401) {
        window.location.href = "/";
      }
    } else {
      console.error("Error response is undefined", error);
    }
    return Promise.reject(error);
  }
);

export default API;