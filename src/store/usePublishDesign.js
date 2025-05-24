import { create } from "zustand";

export const usePublishDesign = create((set) => ({
  productName: "",
  productType: "t_shirt",
  productColor: "#000000",
  productSize: [],
  listing: "",
  productPrice: 0,
  visibily: "public",
  visibilyPassword: "",
  setProductName: (name) => set({ productName: name }),
  setProductType: (type) => set({ productType: type }),
  setProductColor: (color) => set({ productColor: color }),
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
  setVisibily: (visibily) => set({ visibily }),
  setVisibilyPassword: (password) => set({ visibilyPassword: password }),
  reset: () =>
    set({
      productName: "",
      productType: "T-shirt",
      productColor: "#000000",
      productSize: [],
      listing: "",
      productPrice: 0,
      visibily: "public",
      visibilyPassword: "",
    }),
}));
