import React from "react";
import { Eye } from "lucide-react";
import moment from "moment";

/**
 * Renders one table row for the OrdersTable.
 * Receives:
 *  - item: one order object
 */
export default function TableItems({ item }) {
  return (
    <tr className="border-t hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm">{item.id}</td>
      <td className="px-4 py-3 text-sm">{item.orderItems?.length}</td>
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span>{item.paymentProviderType ? item.paymentProviderType : '----'}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">{item.totalPrice} UZS</td>
      <td className="px-4 py-3 text-sm">
        <span className="w-auto text-black font-[500] text-md px-3 py-1 rounded-full flex items-center gap-1">
          🚚 {item.status}
        </span>
      </td>
      <td className="px-4 py-3 text-sm">{moment(item.createdAt).format('YYYY:MM:DD')}</td>
      <td className="px-4 py-3 text-sm">
        <button className="text-gray-600 hover:text-black flex items-center gap-1">
          <Eye size={16} /> View
        </button>
      </td>
    </tr>
  );
}
