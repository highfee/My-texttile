import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useRegisterStore = create(
  persist(
    (set) => ({
      email: "",
      password: "",
      phoneNumber: "",
      referralCode: "",
      firstname: "",
      lastname: "",
      code: "",
      loading: false,
      error: null,
      UserData: null,
      setUserData: (userData) => set({ UserData: userData }),
      setEmail: (email) => set({ email }),
      setPassword: (password) => set({ password }),
      setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
      setReferralCode: (referralCode) => set({ referralCode }),
      setCode: (code) => set({ code }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      setFirstname: (firstname) => set({ firstname }),
      setLastname: (lastname) => set({ lastname }),
      clearStore: () =>
        set({
          email: "",
          password: "",
          phoneNumber: "",
          referralCode: "",
          firstname: "",
          lastname: "",
          code: "",
          loading: false,
          error: null,
          UserData: null,
        }),
    }),
    {
      name: "register-store", // unique name
    }
  )
);
