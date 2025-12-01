"use client";

import CustomInput from "@/app/components/CustomInput";
import Modal from "@/app/components/Modal";
import { Tag, Sparkles, Lightbulb, DotIcon } from "lucide-react";
import { useState } from "react";

const dataTips = [
  {
    value: "codes",
    label: "Codes are case-insensitive"
  },
  {
    value: "one",
    label: "Only one code per order"
  },
  {
    value: "some",
    label: "Some codes may have expiry dates"
  }
]

export const PromoCode = () => {
  const [promo, setPromo] = useState("")
  const [open, setOpen] = useState(false)
 
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
     <div className="w-full bg-green-600/20 px-4 py-3 mt-3 mb-[30px] flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        {/* Circle Icon */}
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <Sparkles size={28} className="text-green-700" />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-sm md:text-md lg:text-lg font-medium text-black">
            Have a Premium Code?
          </h3>
          <p className="text-gray-400 text-[12px]">
            Get 50% off with <span className="font-medium">GreenLeaf</span> promo codes
          </p>
        </div>
      </div>

      {/* Apply Button */}
      <button onClick={handleOpen} className="flex items-center gap-2 bg-green-600 text-white text-green-700 px-3 md:px-6 py-2.5 rounded-xl text-sm font-semibold transition">
        <Tag size={18} className="text-white" />
        Apply
      </button>

    </div>

    <Modal
     open={open}
     onClose={handleClose}
    >
       <div className="md:w-[400px] w-[300px] flex flex-col gap-[20px] h-auto p-1 md:p-2">
        <div className="w-full flex flex-col items-center gap-[15px] justify-center">
          <div className="w-[60px] h-[60px] rounded-[30px] bg-green-700/20">

          </div>
         <div className="flex flex-col items-center gap-[10px]">
           <span className="text-[18px] font-semibold">Premium Promo Code</span>
           <span className="text-[13px] text-center text-gray-500">Enter your pre-issued GreenLeaf promo code to get 50% off</span>
         </div>
        </div>
        <div className="w-full flex flex-col gap-[15px]">
          <div className="flex flex-col items-start gap-[10px]">
            <span className="text-[14px] font-medium">Promo Code</span>
            <CustomInput
              type="text"
              placeholder="Enter code (e.g, GREENLEAFCODE)"
              value={promo}
              className="placeholder:text-[13px]"
              />
          </div>
          <button className="w-full bg-green-700 text-white text-sm font-medium rounded-[10px] px-3 py-3">Apply Code</button>
        </div>
        <div className="w-full p-[10px] bg-green-700/10 rounded-[10px] flex flex-col items-start gap-[10px]">
           <div className="flex text-gray-500 text-[13px] font-bold gap-[5px] items-center">
             <Lightbulb size={15} className="font-bold text-gray-500" />
              Tips
           </div>
           <div className="flex flex-col items-start gap-[5px]">
              {dataTips?.map((item) => (
                <div key={item.value} className="flex items-center">
                  <DotIcon size={30} className="text-gray-400" />
                  <span className="text-[14px] text-gray-400">{item.label}</span>
                </div>
              ))}
           </div>
        </div>
       </div>
    </Modal>
    </>
  );
};