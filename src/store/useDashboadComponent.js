import { create } from "zustand";

export const useDashboardComponentStore = create((set) => ({
  activeComponent: "Home",
  setActiveComponent: (component) => set({ activeComponent: component }),
}));
