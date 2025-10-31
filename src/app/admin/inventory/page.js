"use client"
import { useState } from "react";
import { InventoryCard } from "./components/card";
import { Search } from "lucide-react";
import { FilterDropDown } from "../components/Filter";
import Table from "../components/Table";
import { TableItems } from "./components/TableItems";

const columns = [
 "Products",
 "SKU",
 "Location",
 "Current Stock",
 "Reorder Point",
 "Status",
 "Stock Value",
 "Actions"
]

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filterOptions = ["All Products", "In Stock", "Low Stock", "Out of Stock"];

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const inventory = [
     {
    product: "Bamboo Toothbrush Set",
    set: "4",
    sku: "ECO-TOOTH-001",
    location: "A-12",
    currentStock: "45",
    reorder: "10",
    status: "stock",
    value: "2,025,000"
   }
  ]

  return (
    <div className="w-full flex flex-col gap-[20px]">
    <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold">Inventory Management</h1>
        <p className="text-gray-500">
          Track and manage product stock levels across all storage locations
        </p>
    </div>
    <div className="w-full grid grid-cols-4 gap-[20px]">
      <InventoryCard title="Total Products" value="6" />
      <InventoryCard title="Out of Stock" value="6" />
      <InventoryCard title="Low Stock" value="0" />
      <InventoryCard title="Stock Value" value="14.1M UZS" />
    </div>
    <div className="w-full flex items-center justify-between border border-gray-200 rounded-[10px] p-2 bg-white shadow-sm">
        {/* Search Input */}
        <div className="flex items-center flex-1 bg-gray-50 rounded-[10px] px-3 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <FilterDropDown filterOptions={filterOptions} />
    </div>
    <Table columns={columns} data={inventory} RowComponent={TableItems} />
    <div className="w-full p-[15px] border rounded-[10px] border-gray-200 flex flex-col items-start gap-[15px]">
      <span className="text-[16px] font-[400]">Recent Stock Adjustments</span>
      <div className="w-full flex flex-col items-center gap-[10px]">
        <div className="p-[15px] w-full bg-[#f5f5f0] rounded-[10px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] rounded-[10px] border border-gray-200">

            </div>
            <div className="flex flex-col items-start">
              <span className="text-[16px] font-[500]">Bamboo Toothbrush Set</span>
              <span className="text-[12px] font-[400] text-gray-400">Added 20 units • Supplier restock</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[13px] font-[400]">25 → 45</span>
            <span className="text-gray-300 text-[12px]">Oct 20, 10:30 AM</span>
          </div>
        </div>
      </div>
       <div className="w-full flex flex-col items-center gap-[10px]">
        <div className="p-[15px] w-full bg-[#f5f5f0] rounded-[10px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] rounded-[10px] border border-gray-200">

            </div>
            <div className="flex flex-col items-start">
              <span className="text-[16px] font-[500]">Bamboo Toothbrush Set</span>
              <span className="text-[12px] font-[400] text-gray-400">Added 20 units • Supplier restock</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[13px] font-[400]">25 → 45</span>
            <span className="text-gray-300 text-[12px]">Oct 20, 10:30 AM</span>
          </div>
        </div>
      </div>
       <div className="w-full flex flex-col items-center gap-[10px]">
        <div className="p-[15px] w-full bg-[#f5f5f0] rounded-[10px] flex items-center justify-between">
          <div className="flex items-center gap-[10px]">
            <div className="w-[40px] h-[40px] rounded-[10px] border border-gray-200">

            </div>
            <div className="flex flex-col items-start">
              <span className="text-[16px] font-[500]">Bamboo Toothbrush Set</span>
              <span className="text-[12px] font-[400] text-gray-400">Added 20 units • Supplier restock</span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[13px] font-[400]">25 → 45</span>
            <span className="text-gray-300 text-[12px]">Oct 20, 10:30 AM</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}