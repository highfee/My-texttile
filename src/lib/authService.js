const AUTH_KEY = "auth";

export const authService = {
  // Store tokens securely
  setSession: (authData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          expiresAt: Date.now() + authData.expiresIn * 1000,
        })
      );
    }
  },

  // Get current session
  getSession: () => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  // Clear session on logout
  clearSession: () => {
    localStorage.removeItem(AUTH_KEY);
    // Clear all cached queries
    queryClient.clear();
  },

  // Check if token is valid
  isAuthenticated: () => {
    const session = this.getSession();
    return !!session && session.expiresAt > Date.now();
  },
};
