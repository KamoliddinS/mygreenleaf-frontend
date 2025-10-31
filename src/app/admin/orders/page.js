"use client";
import { useState } from "react";
import { OrderCard } from "./components/card";
import Table from "../components/Table";
import TableItems from "./components/TableItems";

  const columns = [
    "Order ID",
    "Items",
    "Customer",
    "Payment",
    "Total",
    "Status",
    "Time",
    "Actions",
  ];

export default function OrdersPage() {
  const [activeStatus, setActiveStatus] = useState("All");

  const statuses = [
    { title: "All", count: 1 },
    { title: "New", count: 0 },
    { title: "Picking", count: 0 },
    { title: "Ready", count: 1 },
    { title: "In Transit", count: 1 },
    { title: "Delivered", count: 0 },
    { title: "Canceled", count: 0 },
  ];

    const orders = [
    {
      orderId: "0RD-2025-001",
      items: "2 items",
      customerName: "user-1",
      customerLocation: "Yunusabad",
      paymentMethod: "CLICK",
      paymentStatus: "completed",
      total: "157,500 UZS",
      status: "in transit",
      time: "4:15:00 PM",
    },
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
        <OrderCard value={1} title="ALL" />
        <OrderCard value={0} title="New" />
        <OrderCard value={0} title="Picking" />
        <OrderCard value={1} title="Ready" />
        <OrderCard value={1} title="In Transit" />
        <OrderCard value={0} title="Delivered" />
        <OrderCard value={0} title="Canceled" />
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
        <Table columns={columns} data={orders} RowComponent={TableItems} />
    </div>
  );
}