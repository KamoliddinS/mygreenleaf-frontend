"use client"

import { SearchIcon, ShoppingCart, User } from "lucide-react"


export const Header = () => {
    return (
        <>
         <div className="w-full flex flex-col px-4 items-center gap-[10px]">
            <div className="w-full py-[10px] flex items-center justify-between">
           <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] border rounded-[50px]"></div>
            <span className="text-[16px] md:block hidden font-[700]">GreenLeaf</span>
           </div>
            <div className="w-[200px] h-[30px] border bg-green-600/20 rounded-[10px]"></div>
            <div className="flex items-center gap-[10px]">
              <a className="p-[6px] rounded-[20px] bg-gray-200/50" href="/auth/login">
               <User size={20} className="text-gray-600" />
              </a>
              <div className="p-[10px] hover:bg-green-100 rounded-[10px] transition-transform duration-500">
                <ShoppingCart size={17} className="text-gray-700" />
               </div>
            </div>
            </div>
            <div className="w-full rounded-[20px] px-[15px] py-[10px] bg-green-600/20 flex items-center gap-[10px]">
                <SearchIcon size={20} className="text-gray-500" />
                <input 
                 type="text"
                 className="w-full bg-transparent outline-none placeholder:text-[13px] border-none"
                 placeholder="Search eco-friendly products.."
                />
            </div>
         </div>
        </>
    )
}