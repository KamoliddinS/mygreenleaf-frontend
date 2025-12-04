import { act, useState } from "react"
import {Calendar, ClipboardList } from "lucide-react";



export const Orders = () => {
    const [active, setActive] = useState('active')


    return (
        <>
        <div className="flex flex-col gap-6">

          {/* Top Filter Buttons */}
          <div className="flex gap-3">
            <button onClick={() => setActive("active")} className={`px-4 py-2 ${active === 'active' ? 'bg-green-600 text-white' : 'text-gray-700 bg-gray-200'} rounded-lg text-[14px]`}>Active</button>
            <button onClick={() => setActive("archived")} className={`px-4 py-2 ${active === 'archived' ? 'bg-green-600 text-white' : 'text-gray-700 bg-gray-200'} rounded-lg text-[14px]`}>Archived</button>
            <button onClick={() => setActive("canceled")} className={`px-4 py-2 ${active === 'canceled' ? 'bg-green-600 text-white' : 'text-gray-700 bg-gray-200'} rounded-lg text-[14px]`}>Canceled</button>
          </div>

          {/* Order Example #1 */}
          <div className="bg-white border shadow rounded-xl p-5">
            <div className="flex justify-between">
              <p className="font-semibold">ORD-2024-001</p>
              <span className="bg-green-100 text-green-700 px-3 py-[2px] rounded-full text-[13px]">
                Active
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-500 text-[14px]">
              <Calendar size={16} />
              November 28, 2024
            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-500 text-[14px]">
              <ClipboardList size={16} />
              3 items
            </div>

            <div className="mt-3 font-medium text-[16px]">$129.99</div>

            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[14px]">
              View Details
            </button>
          </div>

          {/* Order Example #2 */}
          <div className="bg-white border shadow rounded-xl p-5">
            <div className="flex justify-between">
              <p className="font-semibold">ORD-2024-002</p>
              <span className="bg-green-100 text-green-700 px-3 py-[2px] rounded-full text-[13px]">
                Active
              </span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-gray-500 text-[14px]">
              <Calendar size={16} />
              November 25, 2024
            </div>

            <div className="flex items-center gap-2 mt-2 text-gray-500 text-[14px]">
              <ClipboardList size={16} />
              2 items
            </div>

            <div className="mt-3 font-medium text-[16px]">$89.50</div>

            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[14px]">
              View Details
            </button>
          </div>

        </div>    
        </>
    )
}