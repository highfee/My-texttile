import { create } from "zustand";

export const useRegisterStore = create((set) => ({
  email: "",
  password: "",
  phoneNumber: "",
  referralCode: "",
  code: "",
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setReferralCode: (referralCode) => set({ referralCode }),
  setCode: (code) => set({ code }),
}));
