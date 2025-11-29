import { useState } from "react"
import { Edit } from "../../components/svgs/Svgs"
import Modal from "@/app/components/Modal"
import CustomInput from "@/app/components/CustomInput"
import { useForm } from "react-hook-form"
import { usePutRequest } from "@/app/shared/hooks/requests"
import { CATALOGUE } from "@/app/shared/utils/urls"
import { toast } from "sonner"


export const Update = ({id, data, setData}) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
      } = useForm();
    const [open, setOpen] = useState(false)
    const updateCatalogue = usePutRequest({url: `${CATALOGUE}${id}`})

    const handleOpen = () => {
        setOpen(true)
         reset({
          title: data || ""
         });
    }

    const handleClose = () => {
        setOpen(false)
    }

      // Submit form
  const onUpdate = async (data) => {
    
    const {success, response} = await updateCatalogue.request({
        data: {
            title: data.title,
        }
    })
    if(success) {
      toast.success("Catalogue updated successfully");
      setOpen(false)
      setData?.((prev) =>
        prev.map((item) => (item.id === response.id ? response : item))
      );
    }
  };

    return (
        <>
         <button onClick={handleOpen}>
            <Edit />
         </button>

          <Modal open={open} onClose={handleClose}>
                 <div className="w-[300px] max-w-xl">
         
                   <h2 className="text-xl font-semibold text-gray-800 mb-4">
                     Update Catalogue
                   </h2>
         
                   <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
                     {/* Title */}
                     <CustomInput
                       label="Catalogue Title"
                       placeholder="Enter title"
                       value={watch("title")}
                       onChange={(v) => setValue("title", v)}
                     />
         
                     {/* Submit Button */}
                    <div className="w-full flex items-center gap-[10px]">
                     <button
                       onClick={handleClose}
                       className="w-[50%] mt-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 
                                  text-white font-semibold transition"
                     >
                       Cancel
                     </button>
                      <button
                       type="submit"
                       className="w-[50%] mt-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 
                                  text-white font-semibold transition"
                     >
                       Update
                     </button>
                    </div>
                   </form>
                 </div>
               </Modal>
        </>
    )
}