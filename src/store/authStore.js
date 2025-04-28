import { create } from "zustand";
import { authService } from "@/lib/authService";

const useAuthStore = create((set) => ({
  session: authService.getSession(), // Initialize with the current session
  setSession: (session) => set({ session }),
  clearSession: () => {
    authService.clearSession(); // Clear session from localStorage
    set({ session: null }); // Update Zustand state
  },
}));

export default useAuthStore;
