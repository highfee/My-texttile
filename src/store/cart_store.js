import { create } from "zustand";

import { toast } from "sonner";

const useCartStore = create((set, get) => ({
  items: [],
  total: 0,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id);
      toast.message("Item added to cart");
      return {
        items: [...state.items, { ...item, quantity: item.quantity || 1 }],
      };
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  incrementQuantity: (id) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { items };
    }),

  decrementQuantity: (id) =>
    set((state) => {
      const items = state.items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { items };
    }),

  clearCart: () => set({ items: [] }),

  getTotalCount: () =>
    get().items.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get()
      .items.map((item) => item.shop_price * item.quantity)
      .reduce((total, price) => total + price, 0),
}));

export default useCartStore;
