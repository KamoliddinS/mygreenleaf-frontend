"use client";

import { Update } from "../features/Update";
import { Delete } from "../features/Delete";
import moment from "moment";
import Image from "next/image";

export const TableItems = ({ item, setData }) => {
  return (
    <tr className="border-t hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <div className="w-[50px] h-[50px]">
              <Image
                src={`${item?.imageUrl}?v=${item?.updatedAt || Date.now()}`} // Force reload on update
                alt={item.title}
                width={50}
                height={50}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-[14px] font-[500]">{item.title}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-sm">
        {moment(item.createdAt).format("HH:mm:ss")}
      </td>
      <td className="px-4 py-3 text-sm">
        {moment(item.updatedAt).format("HH:mm:ss")}
      </td>
      <td className="px-4 py-7 text-sm flex items-center gap-[15px]">
        <Update id={item.id} data={item} setData={setData} />
        <Delete id={item.id} setData={setData} />
      </td>
    </tr>
  );
};