"use client";

import { MoveRight } from "lucide-react";
import { useCartStore } from "./store/cartStore";

export const BottomCartBar = () => {
  const cart = useCartStore((state) => state.cart);

  // Compute total items and price here
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);

  if (totalItems === 0) return null; // Hide when empty

  return (
    <div className="
      fixed bottom-0 left-0 right-0 z-40
      bg-white text-white py-3 px-5
      flex items-center border justify-between
      shadow-xl
    ">
      <div className="w-full bg-green-700 px-[20px] rounded-[20px] py-[15px] flex items-center justify-between">
        <div>
        <p className="text-md font-semibold">{totalItems} items</p>
      </div>
      <div className="flex items-center gap-[10px]">
        <p className="text-sm">{totalPrice.toLocaleString()} UZS</p>
        <MoveRight />
      </div>
      </div>
    </div>
  );
};