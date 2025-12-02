"use client";
import { create } from "zustand";
import { useEffect } from "react";

const CART_KEY = "cart-data";

export const useCartStore = create((set, get) => ({
  cart: {},

  loadCart: () => {
    if (typeof window !== "undefined") {
      const saved = JSON.parse(localStorage.getItem(CART_KEY) || "{}");
      set({ cart: saved });
    }
  },

  saveCart: (cart) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }
  },

  addItem: (product) =>
    set((state) => {
      const id = product.id;
      const existing = state.cart[id];
      const updatedCart = {
        ...state.cart,
        [id]: {
          ...product,
          qty: existing ? existing.qty + 1 : 1,
        },
      };
      get().saveCart(updatedCart);
      return { cart: updatedCart };
    }),

  removeItem: (id) =>
    set((state) => {
      const item = state.cart[id];
      if (!item) return state;

      let updatedCart = { ...state.cart };
      if (item.qty === 1) delete updatedCart[id];
      else updatedCart[id] = { ...item, qty: item.qty - 1 };

      get().saveCart(updatedCart);
      return { cart: updatedCart };
    }),

  deleteItem: (id) => {
    const updatedCart = { ...get().cart };
    delete updatedCart[id];
    get().saveCart(updatedCart);
    set({ cart: updatedCart });
  },

  clearCart: () => {
    get().saveCart({});
    set({ cart: {} });
  },

  getQty: (id) => get().cart[id]?.qty || 0,
}));