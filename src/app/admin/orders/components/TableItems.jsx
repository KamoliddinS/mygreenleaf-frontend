import React from "react";
import { Eye } from "lucide-react";

/**
 * Renders one table row for the OrdersTable.
 * Receives:
 *  - item: one order object
 */
export default function TableItems({ item }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm">{item.orderId}</td>
      <td className="px-4 py-3 text-sm">{item.items}</td>
      <td className="px-4 py-3 text-sm">
        <div className="flex flex-col">
          <span>{item.customerName}</span>
          <span className="text-xs text-gray-400">{item.customerLocation}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span>{item.paymentMethod}</span>
          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
            {item.paymentStatus}
          </span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{item.total}</td>
      <td className="px-4 py-3 text-sm">
        <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          🚚 {item.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">{item.time}</td>
      <td className="px-4 py-3 text-sm">
        <button className="text-gray-600 hover:text-black flex items-center gap-1">
          <Eye size={16} /> View
        </button>
      </td>
    </tr>
  );
}
