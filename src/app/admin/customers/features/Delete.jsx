import Modal from "@/app/components/Modal"
import { useState } from "react"
import { Trash } from "../../components/svgs/Svgs"
import { useDeleteRequest } from "@/app/shared/hooks/requests"
import { USER } from "@/app/shared/utils/urls"
import { toast } from "sonner"


export const Delete = ({id, setData}) => {
    const [open, setOpen] = useState(false)
    const deleteUser = useDeleteRequest({url: `${USER}${id}`})

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const onDelete = async () => {
    const { success } = await deleteUser.request()

    if (success) {
      toast.success("Successfully deleted brand")
      setOpen(false)
      setData?.((prev) => prev.filter((item) => item.id !== id))
    }
}

    return (
        <>
         <button onClick={handleOpen}>
             <Trash />
        </button>

        <Modal open={open} onClose={handleClose}>
                <div className="w-[300px] max-w-xl p-2">
        
                  {/* Title */}
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    Are you sure to delete this user?
                  </h2>
        
                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-5">
                    This action cannot be undone.
                  </p>
        
                  {/* Buttons */}
                  <div className="w-full flex items-center gap-[10px]">
                    <button
                      onClick={handleClose}
                      className="w-[50%] py-2.5 rounded-xl bg-gray-300 hover:bg-gray-400 
                                 text-gray-800 font-semibold transition"
                    >
                      Cancel
                    </button>
        
                    <button
                      onClick={onDelete}
                      className="w-[50%] py-2.5 rounded-xl bg-red-600 hover:bg-red-700 
                                 text-white font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
        </Modal>
        </>
    )
}