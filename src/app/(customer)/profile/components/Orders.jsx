import { useState } from "react"
import {Calendar, ClipboardList } from "lucide-react";
import { useDeleteRequest, useLoad } from "@/app/shared/hooks/requests";
import { ORDER } from "@/app/shared/utils/urls";
import moment from "moment";
import { toast } from "sonner";



export const Orders = () => {
    const [active, setActive] = useState('Pending')
    const loadOrders = useLoad({url: ORDER}, [])
    const deleteOrder = useDeleteRequest()
    const orders = loadOrders?.response ? loadOrders?.response : []
    const filteredOrders = orders.filter(order => order.status === active);
    
    const handleDelete = async (id) => {
      const {success} = await deleteOrder.request({
        url: `${ORDER}/${id}`
      })
      if(success) {
        toast.success("Zakaz muvofoqiyatli o`chirildi !");
        loadOrders.request()
      }
    }

    return (
        <>
        <div className="flex flex-col gap-6">

          {/* Top Filter Buttons */}
          <div className="flex gap-3">
            <button onClick={() => setActive("Pending")} className={`px-4 py-2 ${active === 'Pending' ? 'bg-green-600 text-white' : 'text-gray-700 bg-gray-200'} rounded-lg text-[14px]`}>Active</button>
            <button onClick={() => setActive("archived")} className={`px-4 py-2 ${active === 'archived' ? 'bg-green-600 text-white' : 'text-gray-700 bg-gray-200'} rounded-lg text-[14px]`}>Archived</button>
            <button onClick={() => setActive("canceled")} className={`px-4 py-2 ${active === 'canceled' ? 'bg-green-600 text-white' : 'text-gray-700 bg-gray-200'} rounded-lg text-[14px]`}>Canceled</button>
          </div>

         {filteredOrders?.length > 0 ? (
          filteredOrders?.map((item) => (
          <div key={item.id} className="bg-white border shadow rounded-xl p-5">
            <div className="flex justify-between">
              <p className="font-semibold">ORDER-{item.id}</p>
              <span className="bg-green-100 text-green-700 px-3 py-[2px] rounded-full text-[13px]">
                {item.status}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-500 text-[14px]">
              <Calendar size={16} />
              {moment(item.createdAt).format("HH:mm:ss a")}
            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-500 text-[14px]">
              <ClipboardList size={16} />
              {item.orderItems?.length}
            </div>

            <div className="mt-3 font-medium text-[16px]">{item.totalPrice} UZS</div>
            <div className="flex items-center gap-[20px]">
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[14px]">
              View Details
            </button>
            <button onClick={() => handleDelete(item.id)} className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-[14px]">
              Cancel
            </button>
            </div>
          </div>
         ))
         ) : (
          <>
            <div className="w-full h-full pt-[100px] flex flex-col items-center justify-center">
             <div className="flex flex-col items-center gap-[5px]">
               <span className="text-[60px]">🔍</span>
               <span className="font-[500] text-[16px]">No {active} found</span>
               <span className="text-gray-400 text-[14px]">Check back soon for new products</span>
             </div>
             </div>
          </>
         )}

          </div>    
        </>
    )
}