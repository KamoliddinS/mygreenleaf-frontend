"use client"

import { useEffect } from "react";
import { useCartStore } from "./cartStore";

export default function CartProvider({ children }) {
  const loadCart = useCartStore((state) => state.loadCart);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return children;
}