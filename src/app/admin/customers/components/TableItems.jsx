import { Eye, User } from "lucide-react"
import moment from "moment"
import { Update } from "../features/Update"
import { Delete } from "../features/Delete"


export const TableItems = ({item, setData}) => {
    return (
        <>
         <tr className="border-t hover:bg-gray-50 transition-colors">
            <td className="px-4 py-3 text-sm">
                <div className="flex items-center gap-[10px]">
                    <div className="w-[35px] h-[35px] rounded-[20px] border">
                    <User className="text-gray-500" size={30} />
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="font-[500] text-[15px]">{item.email ? item.email : '-----'}</span>
                        <span className="text-[12px] text-gray-500">Joined {moment(item.updatedAt).format("HH:mm:ss")}</span>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-sm">
                {item.phoneNumber ? item?.phoneNumber : '+998 -- --- -- --'}
            </td>
            <td className="px-4 whitespace-nowrap py-3 text-sm">
                {moment(item.createdAt).format("YYYY-MM-DD")}
            </td>
            <td className="px-4 py-3 text-sm">
                {item.address ? item.address : '-------'}
            </td>
            <td className="px-4 py-3 text-sm">
                {item.orders ? item.orders : 0}
            </td>
            <td className="px-4 py-3 text-sm">
                {item.role}
            </td>
            <td className="px-4 py-6 flex items-center gap-[20px] text-sm">
               <Update />
               <Delete id={item.id} setData={setData} />
            </td>
         </tr>
        </>
    )
}