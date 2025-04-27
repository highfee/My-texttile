import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { authService } from "./authService";

const httpClient = axios.create({
  baseURL: process.env.API_BASE_URL || "http://23.88.47.163/dev/api/v1/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
httpClient.interceptors.request.use(
  async (config) => {
    // Attach auth token
    const token = authService.getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token for mutating requests
    if (config.method?.toUpperCase() !== "GET") {
      const csrfToken = getCSRFToken(); // Implement your CSRF token retrieval
      if (csrfToken && config.headers) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token refresh
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await authService.refreshToken();
        authService.setAccessToken(newToken);
        return httpClient(originalRequest);
      } catch (refreshError) {
        authService.clearSession();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    if (error.response) {
      const errorMessage = getErrorMessage(error);
      return Promise.reject(new Error(errorMessage));
    }

    return Promise.reject(error);
  }
);

// Helper function for error messages
const getErrorMessage = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 403:
        return "You don't have permission for this action";
      case 429:
        return "Too many requests. Please try again later";
      default:
        return error.response.data?.message || "An unexpected error occurred";
    }
  }
  return "Network error - please check your internet connection";
};

export { httpClient };
