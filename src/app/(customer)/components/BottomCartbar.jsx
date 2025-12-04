"use client";

import { MoveRight } from "lucide-react";
import { useCartStore } from "./store/cartStore";
import { useGlobalContext } from "./context/GlobalContext";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export const BottomCartBar = () => {
  const [token, setToken] = useState('')
  const cart = useCartStore((state) => state.cart);
  const {setOpenCart} = useGlobalContext()
  
   useEffect(() => {
    const tokenInfo = localStorage.getItem("token")
    console.log(tokenInfo);
    
    setToken(tokenInfo)
  }, [])


  // Compute total items and price here
  const totalItems = Object.values(cart).reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = Object.values(cart).reduce((sum, item) => sum + item.qty * item.price, 0);

  if (totalItems === 0) return null; // Hide when empty


  const handleOpen = () => {
    if(!token) {
      toast.warning("Please login or register for ordering !")
    } else {
      setOpenCart(true)
    }
    
  }

  return (
    <div className="
      fixed bottom-0 left-0 right-0 z-40
      bg-white text-white py-3 px-5
      flex items-center border justify-between
      shadow-xl
    ">
      <div onClick={handleOpen} className="w-full bg-green-700 px-[20px] rounded-[20px] py-[15px] flex items-center justify-between">
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