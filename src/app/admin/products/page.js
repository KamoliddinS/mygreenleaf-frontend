"use client";

import Table from "../components/Table";
import { CatalogCard } from "./components/card";
import { DotIcon, MinusIcon, MoveRight, PlusIcon, Search } from "lucide-react";
import { TableItems } from "./components/TableItems";
import { useLoad } from "@/app/shared/hooks/requests";
import { INVENTORY, PRODUCTS } from "@/app/shared/utils/urls";
import { Create } from "./features/Create";
import moment from "moment";
import { useState, useEffect } from "react";

// Debounce hook
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

const columns = [
  "Products",
  "Description",
  "Barcode",
  "Price",
  "Stock",
  "Inventory",
  "Action",
];

export default function ProductsPage() {
  const [search, setSearch] = useState("");

  // Debounced search
  const debouncedSearch = useDebounce(search, 400);

  // Products loader (empty at first)
  const loadProducts = useLoad({ url: PRODUCTS, params: {barcode: debouncedSearch} }, [debouncedSearch]);
  const products = loadProducts.response || [];

  // Recent adjustments
  const loadRecents = useLoad(
    { url: `${INVENTORY}/recent`, params: { limit: 5 } },
    []
  );
  const recents = loadRecents.response || [];

  return (
    <div className="w-full flex flex-col gap-[20px]">
      {/* Header */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-2xl font-semibold">Products Management</h1>
          <p className="text-gray-500">Manage products, categories, and inventory</p>
        </div>

        <Create setData={loadProducts.setResponse} />
      </div>

      {/* Stat Cards */}
      <div className="w-full grid grid-cols-4 gap-[20px]">
        <CatalogCard title="Total Products" value={products?.length} />
        <CatalogCard title="Visible" value={products?.length} />
        <CatalogCard title="Low Stock" value={0} />
        <CatalogCard title="Out of Stock" value={0} />
      </div>

      {/* Search Bar */}
      <div className="p-[5px] border border-gray-200 rounded-[10px] flex items-center gap-[15px]">
        <div className="flex items-center flex-1 bg-gray-50 rounded-[10px] px-3 py-2">
          <Search size={18} className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={products}
        RowComponent={TableItems}
        setData={loadProducts.setResponse}
        setRecent={loadRecents.setResponse}
      />

      {/* Recent Stock Adjustments */}
      <div className="w-full rounded-[10px] border p-5 flex flex-col items-start gap-[20px]">
        <span className="text-[16px]">Recent Stock Adjustments</span>

        {recents.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-[10px] bg-[#f5f5f0] flex items-center justify-between w-full"
          >
            <div className="flex items-center gap-[10px]">
              <div
                className={`p-4 rounded-[20px] ${
                  item.adjustmentType === "Addition"
                    ? "bg-green-600/10"
                    : "bg-red-600/10"
                }`}
              >
                {item.adjustmentType === "Addition" ? (
                  <PlusIcon size={16} className="text-green-600" />
                ) : (
                  <MinusIcon size={16} className="text-red-600" />
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-[16px] font-[500]">{item.product?.title}</span>
                <div className="flex text-[13px] text-gray-500 items-center">
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
              <span className="text-[12px] text-gray-400">
                {moment(item.createdAt).format("HH:mm:ss A")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}