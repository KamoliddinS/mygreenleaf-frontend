import { Update } from "../features/Update";
import { Delete } from "../features/Delete";
import Image from "next/image";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { InventoryModal } from "./InventoryModal";
import Barcode from 'react-barcode';

export const TableItems = ({ item, setData, setRecent }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");

  const firstImage = item.productImages?.[0]?.imageUrl
    ? item.productImages[0].imageUrl
    : null;

  const handleOpenAdd = () => {
    setOpen(true);
    setType("Addition");
  };

  const handleOpenMinus = () => {
    setOpen(true);
    setType("Removal");
  };

  return (
    <>
      <tr className="border-t hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 text-sm">
          <span className="flex items-center gap-[10px]">
            <span className="w-[50px] h-[50px] rounded-[6px] flex items-center justify-center">
              {firstImage ? (
                <Image
                  src={firstImage}
                  alt={item.title}
                  width={50}
                  height={50}
                  className="w-full h-full object-cover rounded-[6px]"
                />
              ) : (
                <span className="text-gray-400 text-[12px]">No Image</span>
              )}
            </span>

            <span className="flex flex-col items-start">
              <span className="text-[14px] font-[500]">{item.title}</span>
            </span>
          </span>
        </td>

        <td className="px-4 py-3 text-sm w-[350px]">{item.description}</td>
        <td className="px-4 py-3 text-sm">
            {item.barcode ? (
              <Barcode
                value={item.barcode}
                format="CODE128"
                width={0.8} // narrow bar width
                height={30} // barcode height
                fontSize={10}
              />
            ) : (
              '----------'
            )}
        </td>
        <td className="px-4 py-3 text-sm whitespace-nowrap">
          {item.price.toLocaleString()} UZS
        </td>

        <td className="px-4 py-3 text-sm">
          <span className="p-[3px] text-[12px] font-[600] flex items-center justify-center border rounded-[10px] border-gray-300">
            {item.stockCount || 60}
          </span>
        </td>

        <td className="px-6 py-3 text-sm">
          <div className="flex items-center gap-[10px]">
            <button onClick={handleOpenAdd}>
              <PlusCircle size={19} className="text-gray-600" />
            </button>
            <button onClick={handleOpenMinus}>
              <MinusCircle size={19} className="text-gray-600" />
            </button>
          </div>
        </td>

        <td className="px-4 py-6 text-sm">
          <div className="flex items-center gap-[10px]">
            <Update id={item.id} data={item} setData={setData} />
            <Delete id={item.id} setData={setData} />
          </div>
        </td>
      </tr>

      {/* Modal stays OUTSIDE table → correct */}
      <InventoryModal
        open={open}
        onClose={() => setOpen(false)}
        type={type}
        title={item.title}
        pId={item.id}
        stock={item.stockCount}
        setData={setRecent}
      />
    </>
  );
};