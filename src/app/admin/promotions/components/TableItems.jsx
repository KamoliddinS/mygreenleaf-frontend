import { Calendar, Tag } from "lucide-react";

export const TableItems = ({ item }) => {
  const percentage = Math.round((item.usage / item.usageFull) * 100);

  return (
    <>
      <tr className="border-t hover:bg-gray-50 transition-colors">
        {/* Code & Tag */}
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-[10px]">
            <Tag size={15} className="text-green-700" />
            <span>{item.code}</span>
          </div>
        </td>

        {/* Discount */}
        <td className="px-4 py-3 text-sm">
          <span className="py-[5px] px-[10px] bg-green-800 text-white rounded-[20px]">
            {item.discount} OFF
          </span>
        </td>

        {/* Usage Progress */}
        <td className="px-4 py-3 text-sm">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">
              {item.usage} / {item.usageFull}
            </span>
            <span className="text-black font-medium">{percentage}%</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-2 bg-green-700 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </td>

        {/* Expiry Date */}
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-[10px]">
            <Calendar size={15} className="text-gray-600" />
            {item.expireData}
          </div>
        </td>

        {/* Status Toggle */}
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center gap-2">
            <button
              className={`w-10 h-5 rounded-full flex items-center transition-all duration-300 ${
                item.status ? "bg-green-700" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ${
                  item.status ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${
                item.status ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {item.status ? "Active" : "Inactive"}
            </span>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">
            <button className="text-black font-[500]">View Details</button>
        </td>
      </tr>
    </>
  );
};
