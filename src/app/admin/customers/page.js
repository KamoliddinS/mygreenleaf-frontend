"use client"
import { useState } from "react";
import { FilterDropDown } from "../components/Filter";
import { CustomersCard } from "./components/card";
import { Search } from "lucide-react";
import Table from "../components/Table";
import { TableItems } from "./components/TableItems";

const columns = [
  "Customer",
  "Phone",
  "Location",
  "Orders",
  "Total Spent",
  "Avg Order",
  "Segment",
  "Actions"
]


export default function CustomerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const filterOptions = ["All Products", "In Stock", "Low Stock", "Out of Stock"];


  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const customer = [
    {
      user: "user-1",
      join: "Aug 15, 2024",
      phone: "+998903135557",
      location: "Yunsobod",
      orders: "13",
      totalSpend: "1,185,000",
      avg: "91,153.846",
      segment: "vip"
    },
    {
      user: "user-1",
      join: "Aug 15, 2024",
      phone: "+998903135557",
      location: "Yunsobod",
      orders: "13",
      totalSpend: "1,185,000",
      avg: "91,153.846",
      segment: "vip"
    },
    {
      user: "user-1",
      join: "Aug 15, 2024",
      phone: "+998903135557",
      location: "Yunsobod",
      orders: "13",
      totalSpend: "1,185,000",
      avg: "91,153.846",
      segment: "vip"
    }
  ]

  return (
    <div className="w-full flex flex-col gap-[20px]">
      <div>
      <h1 className="text-2xl font-semibold">Customer Management</h1>
      <p className="text-gray-500">View and manage customer profiles, orders, and engagement</p>
      </div>
    <div className="w-full grid grid-cols-4 gap-[20px]">
      <CustomersCard title="Total Customers" value={7} />
      <CustomersCard title="New This Month" value={2} />
      <CustomersCard title="VIP Customers" value={4} />
      <CustomersCard title="Avg CLV" value="119K" />
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
    <Table columns={columns} RowComponent={TableItems} data={customer} />
    </div>
  );
}