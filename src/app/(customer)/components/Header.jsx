"use client"

import { SearchIcon, ShoppingCart, User } from "lucide-react"
import { useCartStore } from "./store/cartStore"   // ← adjust path if needed
import { useState } from "react"
import { CartPage } from "./Cart"

export const Header = () => {
    const [open, setOpen] = useState(false)
    const cart = useCartStore((s) => s.cart)
    const totalItems = Object.values(cart).reduce((acc, item) => acc + item.qty, 0)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
         <div className="w-full flex flex-col px-4 items-center gap-[10px]">
            <div className="w-full py-[10px] flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-[10px]">
                    <div className="w-[50px] h-[50px] border rounded-[50px]"></div>
                    <span className="text-[16px] md:block hidden font-[700]">GreenLeaf</span>
                </div>

                {/* Center Box */}
                <div className="w-[200px] h-[30px] border bg-green-600/20 rounded-[10px]"></div>

                {/* Right Icons */}
                <div className="flex items-center gap-[10px]">
                    <a className="p-[6px] rounded-[20px] bg-gray-200/50" href="/auth/login">
                        <User size={20} className="text-gray-600" />
                    </a>

                    {/* Cart Icon with Badge */}
                    <div className="relative p-[10px] hover:bg-green-100 rounded-[10px] transition duration-300 cursor-pointer">
                        <ShoppingCart onClick={() => setOpen(true)} size={17} className="text-gray-700" />

                        {totalItems > 0 && (
                            <span className="
                                absolute -top-1 -right-1 
                                bg-red-600 text-white 
                                text-[10px] font-semibold 
                                w-5 h-5 flex items-center justify-center 
                                rounded-full shadow-md
                            ">
                                {totalItems}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Input */}
            <div className="w-full rounded-[20px] px-[15px] py-[10px] bg-green-600/20 flex items-center gap-[10px]">
                <SearchIcon size={20} className="text-gray-500" />
                <input 
                    type="text"
                    className="w-full bg-transparent outline-none placeholder:text-[13px] border-none"
                    placeholder="Search eco-friendly products.."
                />
            </div>
         </div>
         <CartPage open={open} onClose={handleClose} />
        </>
    )
}