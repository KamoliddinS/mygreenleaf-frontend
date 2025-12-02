"use client"

import { useState } from "react";

const data = [
  { value: "ALL", label: "All Products" },
  { value: "care", label: "Personal Care" },
  { value: "Home", label: "Home & Kitten" },
  { value: "bags", label: "Bags & Accessories" },
  { value: "beaty", label: "Beauty & Skincare" },
  { value: "food", label: "Food & Beverages" },
];

export default function Filter() {
  const [active, setActive] = useState("ALL"); // default active

  const handleClick = (value) => {
    setActive(value); // set active
    console.log("Selected value:", value); // log to console
  };

  return (
    <div className="flex items-start gap-[20px] overflow-auto">
      {data.map((item) => (
        <span
          key={item.value}
          onClick={() => handleClick(item.value)}
          className={`py-[6px] px-[10px] text-[14px] whitespace-nowrap font-medium border rounded-[10px] cursor-pointer 
            ${active === item.value ? "bg-green-700 text-white border-green-700" : "hover:bg-green-700/20"}`}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
};