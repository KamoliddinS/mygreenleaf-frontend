import { Eye } from "lucide-react"
import { Update } from "../features/Update"
import { Delete } from "../features/Delete"


export const TableItems = ({item, setData}) => {
    return (
        <tr className="border-t hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 test-sm">
                <div className="flex items-center gap-[10px]">
                    <div className="w-[40px] h-[40px] border rounded-[6px]"></div>
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-[500]">{item.title}</span>
                        <span className="text-[13px] font-[400] text-gray-400">{item.title}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm w-[350px]">{item.description}</td>
            <td className="px-4 py-3 text-sm">{item.catalogueId}</td>
            <td className="px-4 py-3 text-sm">{item.price} UZS</td>
            <td className="px-4 py-3 text-sm">
                <div className="p-[3px] text-[12px] font-[600] flex items-center justify-center border rounded-[10px] border-gray-300">
                    {item.stockCount || 60}
                </div>
            </td>
            {/* <td className="px-4 py-3 text-sm">
                {item.status === 'Visible' ? (
                    <div className="p-[2px] text-[12px] rounded-[10px] bg-green-700 text-white font-[500] flex items-center justify-center">
                        {item.status}
                    </div>
                ) : (
                    <div className="p-[2px] rounded-[10px] bg-red-700 text-white font-[500] flex items-center justify-center">
                        Visible
                    </div>
                )}
            </td> */}
            <td className="px-4 py-6 text-sm flex items-center gap-[10px]">
               <Update id={item.id} data={item} setData={setData} />
               <Delete id={item.id} setData={setData} />
            </td>
        </tr>
    )
}