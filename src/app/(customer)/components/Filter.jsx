"use client"

import { useLoad } from "@/app/shared/hooks/requests";
import { BRAND, CATALOGUE } from "@/app/shared/utils/urls";
import { useState } from "react";

export default function Filter({ setcId, setbId }) {
  const [activeC, setActiveC] = useState("ALL"); 
  const [activeB, setActiveB] = useState("ALL");

  const loadCatalogue = useLoad({ url: CATALOGUE }, []);
  const loadBrand = useLoad({ url: BRAND }, []);

  const catalogues = loadCatalogue?.response || [];
  const brands = loadBrand?.response || [];

  const handleCatalogueClick = (value) => {
    setActiveC(value);
    setcId(value);
  };

  const handleBrandClick = (value) => {
    setActiveB(value);
    setbId(value);
  };

  // Add "ALL" option at the beginning
  const cataloguesWithAll = [{ id: "ALL", title: "ALL" }, ...catalogues];
  const brandsWithAll = [{ id: "ALL", title: "ALL" }, ...brands];

  return (
    <div className="flex flex-col">
      {/* Catalogue Filter */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        {cataloguesWithAll.map((item) => (
          <button
            key={item.id}
            onClick={() => handleCatalogueClick(item.id)}
            className={`px-4 py-1 text-sm font-medium rounded-full border transition-colors whitespace-nowrap
              ${activeC === item.id 
                ? "bg-green-700 text-white border-green-700" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"}`
            }
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Brand Filter */}
      <div className="flex gap-3 overflow-x-auto pb-1 border-t no-scrollbar pt-2">
        {brandsWithAll.map((item) => (
          <button
            key={item.id}
            onClick={() => handleBrandClick(item.id)}
            className={`px-4 py-1 text-sm font-medium rounded-full border transition-colors whitespace-nowrap
              ${activeB === item.id 
                ? "bg-green-700 text-white border-green-700" 
                : "bg-white text-gray-700 border-gray-300 hover:bg-green-100"}`
            }
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};