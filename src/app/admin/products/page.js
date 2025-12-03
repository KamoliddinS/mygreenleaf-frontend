"use client"
import Table from "../components/Table";
import { CatalogCard } from "./components/card";
import { DotIcon, MinusIcon, MoveRight, PlusIcon, Search } from "lucide-react";
import { TableItems } from "./components/TableItems";
import {  useLoad } from "@/app/shared/hooks/requests";
import { INVENTORY, PRODUCTS } from "@/app/shared/utils/urls";
import { Create } from "./features/Create";
import moment from "moment";

const columns = [
  "Products",
  "Description",
  "Barcode",
  "Price",
  "Stock",
  "Inventory",
  "Action"
]

export default function ProductsPage() {
  const loadProducts = useLoad({url: PRODUCTS}, [])
  const products = loadProducts.response ? loadProducts.response : []
  const loadRecents = useLoad({url: INVENTORY}, [])
  const recents = loadRecents?.response ? loadRecents?.response : []

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold">Products Management</h1>
        <p className="text-gray-500">
          Manage products, categories, and inventory
        </p>
        </div>
        <Create setData={loadProducts.setResponse} />
      </div>

      {/* Stat Cards */}
      <div className="w-full grid grid-cols-4 gap-[20px]">
        <CatalogCard title="Total Products" value={products?.length} />
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
      <Table columns={columns} data={products} RowComponent={TableItems} setData={loadProducts.setResponse} setRecent={loadRecents.setResponse} />

      <div className="w-full rounded-[10px] border p-5 flex flex-col items-start gap-[20px]">
        <span className="text-[16px]">Recent Stock Adjustments</span>
        {recents?.map((item) => (
          <div key={item.id} className="p-4 rounded-[10px] bg-[#f5f5f0] flex items-center justify-between w-full">
          <div className="flex items-center gap-[10px]">
            <div className={`p-4 rounded-[20px] ${item.adjustmentType === 'Addition' ? 'bg-green-600/10' : 'bg-red-600/10'}`}>
             {item.adjustmentType === 'Addition' && (
               <PlusIcon size={16} className="text-green-600 font-bold" />
             )}
             {item.adjustmentType === 'Removal' && (
               <MinusIcon size={16} className="text-red-600 font-bold" />
             )}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[16px] font-[500]">{item.product?.title}</span>
              <div className="flex text-[13px] items-center text-gray-500 items-center">
                <span>Added {item.quantity}</span>
                <DotIcon size={20} />
                <span>{item.reason}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex text-[14px] gap-[3px] items-center">
              <span>{item.oldStockCount}</span>
              <MoveRight size={15} />
              <span>{item.quantity + item.oldStockCount}</span>
            </div>
            <span className="text-[12px] text-gray-400">{moment(item.createdAt).format('HH:mm:ss A')}</span>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}