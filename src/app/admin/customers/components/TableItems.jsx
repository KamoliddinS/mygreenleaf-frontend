import { Eye } from "lucide-react"


export const TableItems = ({item}) => {
    return (
        <>
         <tr className="border-t hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-[10px]">
                    <div className="w-[35px] h-[35px] rounded-[20px] border"></div>
                    <div className="flex flex-col items-start">
                        <span className="font-[500] text-[15px]">{item.user}</span>
                        <span className="text-[12px] text-gray-500">Joined {item.join}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">
                {item.phone}
            </td>
            <td className="px-4 py-3 text-sm">
                {item.location}
            </td>
            <td className="px-4 py-3 text-sm">
                {item.orders}
            </td>
            <td className="px-4 py-3 text-sm">
                {item.totalSpend} UZS
            </td>
            <td className="px-4 text-gray-500 py-3 text-sm">
                {item.avg} UZS
            </td>
            <td className="px-4 py-3 text-sm">
                {item.segment}
            </td>
            <td className="px-4 py-3 text-sm">
             <button className="text-gray-600 hover:text-black flex items-center gap-1">
               <Eye size={16} /> View
             </button>
            </td>
         </tr>
        </>
    )
}