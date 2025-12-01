"use client";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  cart: {},

  // Add item or increase qty
  addItem: (product) =>
    set((state) => {
      const id = product.id;
      const existing = state.cart[id];

      return {
        cart: {
          ...state.cart,
          [id]: {
            ...product,
            qty: existing ? existing.qty + 1 : 1,
          },
        },
      };
    }),

  // Decrease qty
  removeItem: (id) =>
    set((state) => {
      const item = state.cart[id];
      if (!item) return state;

      // If last one → remove item
      if (item.qty === 1) {
        const updated = { ...state.cart };
        delete updated[id];
        return { cart: updated };
      }

      // Otherwise decrease
      return {
        cart: {
          ...state.cart,
          [id]: {
            ...item,
            qty: item.qty - 1,
          },
        },
      };
    }),

  // Get qty (must be reactive!)
  getQty: (id) => {
    return get().cart[id]?.qty || 0;
  },
}));