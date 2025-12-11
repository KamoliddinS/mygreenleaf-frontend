import Modal from "@/app/components/Modal"
import { useGetRequest } from "@/app/shared/hooks/requests"
import { PRODUCT_IDS } from "@/app/shared/utils/urls"
import Image from "next/image"
import { useState } from "react"



export const OrderDetail = ({ids}) => {
    const [open, setOpen] = useState(false)
    const getProducts = useGetRequest()
    const queryString = ids.map(id => `ids=${id}`).join("&");
    const products = getProducts?.response ? getProducts?.response : []

    const handleOpen = () => {
        setOpen(true)
        getProducts.request({
            url: `${PRODUCT_IDS}?${queryString}`,
        })
    }

    const handleClose = () => {
        setOpen(false)
    }
    

    return (
        <>
        <button onClick={handleOpen} className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-[14px]">
              View Details
        </button>

        <Modal
         open={open}
         onClose={handleClose}
        >
            <div className="w-[335px] max-h-[300px] overflow-y-auto scrollbar-hidden p-4">
                {products?.map((item) => (
                    <div
                      key={item.id || Math.random()}
                      className="flex w-full pb-[10px] border-b pt-[10px] justify-between items-center gap-4 relative"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-[60px] h-[60px] rounded-xl overflow-hidden bg-gray-100">
                          {item?.productImages?.[0]?.imageUrl ? (
                            <Image
                              src={item.productImages[0].imageUrl}
                              className="w-full h-full object-contain"
                              width={60}
                              height={60}
                              alt={item.title || "product"}
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-200" />
                          )}
                        </div>
    
                        <div className="flex-1">
                          <p className="font-medium text-sm md:text-md">{item.title}</p>
                          <p className="text-gray-500 text-xs  mb-2">
                            {(item.price || 0).toLocaleString()} × {item.qty}
                          </p>
                        </div>
                      </div>
    
                      <p className="font-[400] text-sm md:text-md mt-1">
                        {(item.price || 0).toLocaleString()} UZS
                      </p>
                    </div>
                ))}
            </div>
        </Modal>
        </>
    )
}