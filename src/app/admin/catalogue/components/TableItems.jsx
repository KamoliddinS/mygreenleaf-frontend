import { Eye } from "lucide-react"
import { Update } from "../features/Update"
import { Delete } from "../features/Delete"
import moment from "moment"


export const TableItems = ({item, setData}) => {
    return (
        <tr className="border-t hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 test-sm">
                <div className="flex items-center gap-[10px]">
                    <div className="flex flex-col items-start">
                        <span className="text-[14px] font-[500]">{item.title}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">{moment(item.createdAt).format("HH:mm:ss")}</td>
            <td className="px-4 py-3 text-sm flex items-center gap-[15px]">
               <Update id={item.id} data={item?.title} setData={setData} />
               <Delete id={item.id} setData={setData} />
            </td>
        </tr>
    )
}