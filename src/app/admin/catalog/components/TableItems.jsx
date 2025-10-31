import { Eye } from "lucide-react"


export const TableItems = ({item}) => {
    return (
        <tr className="border-t hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 test-sm">
                <div className="flex items-center gap-[10px]">
                    <div className="w-[40px] h-[40px] border rounded-[6px]"></div>
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-[500]">{item.product}</span>
                        <span className="text-[13px] font-[400] text-gray-400">{item.type}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{item.sku}</td>
            <td className="px-4 py-3 text-sm">{item.category}</td>
            <td className="px-4 py-3 text-sm">{item.price} UZS</td>
            <td className="px-4 py-3 text-sm">
                <div className="p-[3px] text-[12px] font-[600] flex items-center justify-center border rounded-[10px] border-gray-300">
                    {item.stock}
                </div>
            </td>
            <td className="px-4 py-3 text-sm">
                {item.status === 'Visible' ? (
                    <div className="p-[2px] text-[12px] rounded-[10px] bg-green-700 text-white font-[500] flex items-center justify-center">
                        {item.status}
                    </div>
                ) : (
                    <div className="p-[2px] rounded-[10px] bg-red-700 text-white font-[500] flex items-center justify-center">
                        {item.status}
                    </div>
                )}
            </td>
            <td className="px-4 py-3 text-sm">
        <button className="text-gray-600 hover:text-black flex items-center gap-1">
          <Eye size={16} /> View
        </button>
      </td>
        </tr>
    )
}