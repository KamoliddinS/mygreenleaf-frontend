import React from "react";

/**
 * A reusable Table component.
 * Props:
 * - columns: array of column headers (e.g. ["Order ID", "Items", "Customer"])
 * - data: array of data objects
 * - RowComponent: the component to render each row (receives `item`)
 * - emptyMessage: optional message when no data
 * - className: optional extra styles
 */
export default function Table({
  columns = [],
  data = [],
  RowComponent,
  emptyMessage = "No data available",
  className = "",
}) {
  return (
    <div className={`bg-white border rounded-2xl shadow-sm p-4 ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-50 text-left">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className="px-4 py-2 text-sm font-semibold text-gray-700"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.length > 0 ? (
              data.map((item, idx) => (
                <RowComponent key={idx} item={item} />
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-gray-500 py-6"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
