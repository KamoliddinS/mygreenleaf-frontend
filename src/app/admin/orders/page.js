"use client";
import { useState } from "react";
import { OrderCard } from "./components/card";
import Table from "../components/Table";
import TableItems from "./components/TableItems";
import { useLoad } from "@/app/shared/hooks/requests";
import { ORDER } from "@/app/shared/utils/urls";

  const columns = [
    "Order ID",
    "Items",
    "Payment",
    "Total",
    "Status",
    "Time"
  ];

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState("All");
  const loadOrders = useLoad({url: ORDER}, [])
  const orders = loadOrders?.response ? loadOrders?.response : []
  const pendings = orders.filter((item) => item.status === "Pending")
  const delivered = orders.filter((item) => item.status === "Delivered")
  const canceled = orders.filter((item) => item.status === "Canceled")
  const data = orders?.filter((item) => item.status === activeStatus)

  const statuses = [
    { title: "All", count: orders?.length },
    { title: "Pending", count: pendings?.length },
    { title: "Delivered", count: delivered?.length },
    { title: "Canceled", count: canceled?.length},
  ];

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Header */}
      <div className="flex flex-col items-start">
        <h1 className="text-2xl font-semibold">Order Management</h1>
        <p className="text-gray-500">Manage and fulfill customer orders</p>
      </div>

      {/* Top cards */}
      <div className="w-full grid grid-cols-6 gap-3">
        <OrderCard value={orders?.length} title="ALL" />
        <OrderCard value={pendings?.length} title="Pending" />
        <OrderCard value={delivered?.length} title="Delivered" />
        <OrderCard value={canceled?.length} title="Canceled" />
      </div>

      {/* Toggle bar (status filter) */}
      <div className="w-full flex flex-col gap-3">
        <div className="flex items-center justify-start gap-2 bg-gray-50 rounded-full p-1 overflow-x-auto">
          {statuses.map((status) => {
            const isActive = activeStatus === status.title;
            return (
              <button
                key={status.title}
                onClick={() => setActiveStatus(status.title)}
                className={`flex items-center justify-center px-4 py-2 rounded-full w-full text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white shadow text-black"
                    : "text-gray-700 hover:text-black"
                }`}
              >
                {status.title} ({status.count})
              </button>
            );
          })}
        </div>
      </div>
        <Table columns={columns} data={activeStatus === 'All' ? orders : data} RowComponent={TableItems} />
    </div>
  );
}