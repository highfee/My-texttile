import { create } from "zustand";

export const usePublishDesign = create((set) => ({
  productName: "",
  productType: "t_shirt",
  productColors: [],
  productSize: [],
  listing: "",
  productPrice: 0,
  visibility: false,
  visibilityPassword: "",
  setProductName: (name) => set({ productName: name }),
  setProductType: (type) => set({ productType: type }),
  setProductColor: (color) =>
    set((state) => {
      const exists = state.productColors.includes(color);
      return {
        productColors: exists
          ? state.productColors.filter((c) => c !== color)
          : [...state.productColors, color],
      };
    }),
  setProductSize: (size) =>
    set((state) => {
      const exists = state.productSize.includes(size);
      return {
        productSize: exists
          ? state.productSize.filter((s) => s !== size)
          : [...state.productSize, size],
      };
    }),
  setListing: (listing) => set({ listing }),
  setProductPrice: (price) => set({ productPrice: price }),
  setVisibility: (visibility) => set({ visibility }),
  setVisibilityPassword: (password) => set({ visibilityPassword: password }),
  setEditProductColors: (colors) => set({ productColors: colors }),
  setEditProductSize: (sizes) => set({ productSize: sizes }),
  reset: () =>
    set({
      productName: "",
      productType: "t_shirt",
      productColors: [],
      productSize: [],
      listing: "",
      productPrice: 0,
      visibility: "public",
      visibilityPassword: "",
    }),
}));
