import Modal from "@/app/components/Modal"
import { useState } from "react"
import { Edit } from "../../components/svgs/Svgs"



export const Update = () => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
         <button onClick={handleOpen}>
            <Edit />
        </button>

        <Modal
         open={open}
         onClose={handleClose}
        >
            <div className="w-[300px] h-[400px] bg-white">

            </div>
        </Modal>
        </>
    )
}