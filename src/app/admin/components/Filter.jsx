"use client"
import { useState } from "react";
import {  Filter } from "lucide-react";

export const FilterDropDown = ({filterOptions}) => {
    const [filter, setFilter] = useState("All Products");
    const [isOpen, setIsOpen] = useState(false);
      
    const handleFilterSelect = (option) => {
    setFilter(option);
    setIsOpen(false);
  };
    return (
        <>
         {/* Filter Dropdown */}
        <div className="relative ml-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center border border-gray-300 rounded-[10px] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <Filter size={16} className="mr-2 text-gray-500" />
            {filter}
            <svg
              className="ml-2 h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-[10px] shadow-lg z-10">
              {filterOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => handleFilterSelect(option)}
                  className={`px-4 py-2 cursor-pointer hover:bg-green-50 text-sm flex items-center justify-between ${
                    option === filter ? "font-semibold text-gray-800" : "text-gray-600"
                  }`}
                >
                  {option}
                  {option === filter && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 text-green-600"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        </>
    )
}