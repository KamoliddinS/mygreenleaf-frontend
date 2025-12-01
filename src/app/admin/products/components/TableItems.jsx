import { Update } from "../features/Update";
import { Delete } from "../features/Delete";
import Image from "next/image";

export const TableItems = ({ item, setData }) => {
  // Get the first image URL if exists
  const firstImage = item.productImages?.[0]?.imageUrl
    ? `${item.productImages[0].imageUrl}`
    : null;
    

  return (
    <tr className="border-t hover:bg-gray-50 transition-colors">
      <td className="px-4 py-3 text-sm">
        <div className="flex items-center gap-[10px]">
          <div className="w-[50px] h-[50px] rounded-[6px] flex items-center justify-center">
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
          </div>

          <div className="flex flex-col items-start">
            <span className="text-[14px] font-[500]">{item.title}</span>
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

      <td className="px-4 py-6 text-sm flex items-center gap-[10px]">
        <Update id={item.id} data={item} setData={setData} />
        <Delete id={item.id} setData={setData} />
      </td>
    </tr>
  );
};