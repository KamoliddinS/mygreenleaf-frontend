import { Eye, LocationEditIcon } from "lucide-react"


export const TableItems = ({item}) => {
    return (
        <tr className="border-t hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 test-sm">
                <div className="flex items-center gap-[10px]">
                    <div className="h-[40px] w-[40px] border rounded-[10px]"></div>
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-[500]">{item.product}</span>
                        <span className="text-gray-400 text-[12px]">set of {item.set}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{item.sku}</td>
            <td className="px-4 py-3 text-sm">
                <div className="flex items-center text-gray-500 gap-[5px]">
                    <LocationEditIcon width="15px" height="15px" className="text-gray-500" />
                    {item.location}
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{item.currentStock}</td>
            <td className="px-4 py-3 text-sm">{item.reorder}</td>
            <td className="px-4 py-3 text-sm">
                {item.status === 'stock' ? (
                    <div className="p-[2px] text-[12px] rounded-[10px] bg-green-700 text-white font-[500] flex items-center justify-center">
                        In {item.status}
                    </div>
                ) : (
                    <div className="p-[2px] rounded-[10px] bg-red-700 text-white font-[500] flex items-center justify-center">
                        {item.status}
                    </div>
                )}
            </td>
            <td className="px-4 py-3 text-sm">{item.value} UZS</td>
            <td className="px-4 py-3 text-sm">
        <button className="text-gray-600 hover:text-black flex items-center gap-1">
          <Eye size={16} /> View
        </button>
      </td>
        </tr>
    )
}