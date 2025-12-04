"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "./store/cartStore"; // adjust path if needed
import { CartPage } from "./Cart";
import * as Icons from "lucide-react"; // safer import pattern
import { useGlobalContext } from "./context/GlobalContext";
import { LeafIcon } from "./svgs/svg";
import LocationModal from "./LocationModal";

export const Header = () => {
  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [token, setToken] = useState('')
  const [cartSafe, setCartSafe] = useState({});
  const {openCart, setOpenCart} = useGlobalContext()
  
  // Safely get icons
  const { SearchIcon, ShoppingCart, User, MapPin, ChevronDown } = Icons;

    const handleLocationSelected = (loc) => {
    console.log("User selected location:", loc);
    setOpenLocationModal(false); // close modal after selection
  }

  // Get cart from store (client-side only)
  const cart = useCartStore((s) => s.cart || {});

  // Update cartSafe to avoid hydration mismatch
  useEffect(() => {
    setCartSafe(cart);
  }, [cart]);

  const totalItems = Object.values(cartSafe).reduce(
    (acc, item) => acc + (item.qty || 0),
    0
  );

    // SAFE localStorage access
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const handleClose = () => setOpenCart(false);

  return (
    <>
      {/* HEADER MAIN */}
      <div className="w-full flex flex-col px-4 items-center gap-[10px]">
        <div className="w-full py-[10px] flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] border bg-green-700 flex flex-col items-center justify-center rounded-[50px]">
              <LeafIcon />
            </div>
            <a href="/" className="text-[16px] md:block hidden font-[700]">GreenLeaf</a>
          </div>

          {/* Center Box */}
          <div onClick={() => setOpenLocationModal(true)} className="w-[200px] cursor-pointer px-[10px] h-[30px] flex items-center gap-[10px] border bg-green-600/20 rounded-[10px]">
            <MapPin size={15} className="text-green-600" />
            <span className="text-[14px]">Tashkent</span>
            <ChevronDown size={15} className="text-gray-600" />
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-[10px]">
            {token ? (
              <a className="p-[6px] rounded-[20px] bg-gray-200/50" href="/profile">
                <User size={20} className="text-gray-600" />
              </a>
            ) : (
              <a className="p-[6px] rounded-[20px] bg-gray-200/50" href="/auth/login">
                <User size={20} className="text-gray-600" />
              </a>
            )}

            <div onClick={() => setOpenCart(true)} className="relative p-[10px] hover:bg-green-100 rounded-[10px] transition duration-300 cursor-pointer">
              {ShoppingCart && (
                <ShoppingCart
                  size={17}
                  className="text-gray-700"
                />
              )}

              {totalItems > 0 && (
                <span
                  className="
                    absolute -top-1 -right-1 
                    bg-red-600 text-white 
                    text-[10px] font-semibold 
                    w-5 h-5 flex items-center justify-center 
                    rounded-full shadow-md
                  "
                >
                  {totalItems}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full rounded-[20px] px-[15px] py-[10px] bg-green-600/20 flex items-center gap-[10px]">
          {SearchIcon && <SearchIcon size={20} className="text-gray-500" />}
          <input
            type="text"
            className="w-full bg-transparent outline-none placeholder:text-[13px] border-none"
            placeholder="Search eco-friendly products.."
          />
        </div>
      </div>

      <LocationModal
        open={openLocationModal}
        setOpen={setOpenLocationModal}
        onLocationSelected={handleLocationSelected}
      />

      {/* CartPage rendered safely */}
      {CartPage && <CartPage open={openCart} onClose={handleClose} />}
    </>
  );
};