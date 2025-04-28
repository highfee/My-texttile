import getQueryClient from "./client";

const AUTH_KEY = "auth-session";
const queryClient = getQueryClient();

export const authService = {
  setSession: (response) => {
    if (typeof window !== "undefined") {
      const sessionData = {
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        accessTokenExpiration: response.access_token_expiration,
        refreshTokenExpiration: response.refresh_token_expiration,
        user: response.user,
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(sessionData));
    }
  },

  getSession: () => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  clearSession: () => {
    localStorage.removeItem(AUTH_KEY);
    // Clear query cache if using TanStack Query
    if (typeof queryClient !== "undefined") {
      queryClient.clear();
    }
  },
};
