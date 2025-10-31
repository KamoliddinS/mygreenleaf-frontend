import Table from "../components/Table";
import { CatalogCard } from "./components/card";
import { Search } from "lucide-react";
import { TableItems } from "./components/TableItems";

const columns = [
  "Products",
  "SKU",
  "Category",
  "Price",
  "Stock",
  "Status",
  "Action"
]

export default function CatalogPage() {
  const orders = [
    {
      product: "Bamboo Toothbrush Set",
      type: "Eco-friendly bamboo toothbrushes",
      sku: "ECO-TOOTH-001",
      category: "personal-care",
      price: "45,000",
      stock: "62",
      status: 'Visible'
    }
  ]
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
        <button className="text-white rounded-[10px] text-[14px] bg-green-700 py-[6px] px-[15px]">+ Add Product</button>
      </div>

      {/* Stat Cards */}
      <div className="w-full grid grid-cols-4 gap-[20px]">
        <CatalogCard title="Total Products" value={6} />
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
      <Table columns={columns} data={orders} RowComponent={TableItems} />
    </div>
  );
}