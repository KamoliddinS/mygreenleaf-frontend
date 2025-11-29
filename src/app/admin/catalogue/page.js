"use client"
import Table from "../components/Table";
import { CatalogCard } from "./components/card";
import { Search } from "lucide-react";
import { TableItems } from "./components/TableItems";
import {  useLoad } from "@/app/shared/hooks/requests";
import { CATALOGUE } from "@/app/shared/utils/urls";
import { Create } from "./features/Create";

const columns = [
  "Category",
  "CreatedAt",
  "Action"
]

export default function ProductsPage() {
  const loadCatalogue = useLoad({url: CATALOGUE}, [])
  const data = loadCatalogue.response ? loadCatalogue.response : []

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold">Catalog Management</h1>
        <p className="text-gray-500">
          Manage products, categories, and inventory
        </p>
        </div>
        <Create setData={loadCatalogue.setResponse} />
      </div>

      {/* Stat Cards */}
      <div className="w-full grid grid-cols-4 gap-[20px]">
        <CatalogCard title="Total Catalogue" value={data?.length} />
        <CatalogCard title="Visible" value={6} />
        <CatalogCard title="Low Stock" value={0} />
        <CatalogCard title="Out of Stock" value={0} />
      </div>

      {/* Search and Action Bar */}
      <div className="p-[5px] border border-gray-200 rounded-[10px] flex items-center justify-between gap-[15px]">
        {/* Search Section */}
        <div className="flex items-center flex-1 bg-gray-50 rounded-[10px] px-3 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-2">
          <button className="border border-gray-300 rounded-[10px] px-4 py-2 text-sm font-medium hover:bg-gray-100">
            Filters
          </button>
          <button className="border border-gray-300 rounded-[10px] px-4 py-2 text-sm font-medium hover:bg-gray-100">
            Export
          </button>
        </div>
      </div>

      {/* table */}
      <Table columns={columns} data={data} RowComponent={TableItems} setData={loadCatalogue.setResponse} />
    </div>
  );
}