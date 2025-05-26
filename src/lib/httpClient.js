// lib/httpClient.js
import axios from "axios";
import { authService } from "./authService";

const httpClient = axios.create({
  baseURL: "http://23.88.47.163/dev/api/v1",
  timeout: 10000,
  // headers: {
  //   "Content-Type": "application/json",
  // },
});

// Request interceptor
httpClient.interceptors.request.use(
  async (config) => {
    console.log("Request Data:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    const session = authService.getSession();

    if (config.url.includes("/users/register")) {
      config.method = "POST";
      return config;
    }

    // Add CSRF token for non-GET requests
    if (config.method?.toUpperCase() !== "GET") {
      const csrfToken = getCSRFToken();
      if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
      }
    }

    // Check if token needs refresh
    if (session && session.accessTokenExpiration < Date.now()) {
      if (session.refreshTokenExpiration > Date.now()) {
        try {
          const newSession = await refreshTokens(session.refreshToken);
          authService.setSession(newSession);
          config.headers.Authorization = `Bearer ${newSession.accessToken}`;
        } catch (error) {
          authService.clearSession();
          window.location.href = "/";
          return config;
        }
      } else {
        authService.clearSession();
        window.location.href = "/";
        return config;
      }
    }

    // Add authorization header
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const session = authService.getSession();
      if (
        session?.refreshToken &&
        session.refreshTokenExpiration > Date.now()
      ) {
        try {
          const newSession = await refreshTokens(session.refreshToken);
          authService.setSession(newSession);
          originalRequest.headers.Authorization = `Bearer ${newSession.accessToken}`;
          return httpClient(originalRequest);
        } catch (refreshError) {
          authService.clearSession();
          window.location.href = "/";
        }
      }

      authService.clearSession();
      window.location.href = "/";
    }

    const errorMessage = getErrorMessage(error);
    return Promise.reject(new Error(errorMessage));
  }
);

// Helper functions
function getCSRFToken() {
  if (typeof document === "undefined") return null;
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("XSRF-TOKEN="))
    ?.split("=")[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
}

async function refreshTokens(refreshToken) {
  try {
    const response = await httpClient.post("/auth/refresh", {
      refresh_token: refreshToken,
    });

    return {
      accessToken: response.data.response_data.access_token,
      refreshToken: response.data.response_data.refresh_token,
      accessTokenExpiration: Date.parse(
        response.data.response_data.access_token_expiration
      ),
      refreshTokenExpiration: Date.parse(
        response.data.response_data.refresh_token_expiration
      ),
      user: response.data.response_data.user,
    };
  } catch (error) {
    throw new Error("Failed to refresh tokens");
  }
}

function getErrorMessage(error) {
  console.log(error);
  // if (error.response) {
  //   switch (error.response.status) {
  //     case 400:
  //       return "Invalid request";
  //     case 401:
  //       return "Session expired. Please login again";
  //     case 403:
  //       return "You don't have permission for this action";
  //     case 404:
  //       return "Resource not found";
  //     case 429:
  //       return "Too many requests. Please try again later";
  //     default:
  //       return error.response.data?.message || "An unexpected error occurred";
  //   }
  // }
  return (
    error.response.data["response description"] ||
    "Network error - please check your internet connection"
  );
}

export { httpClient };
