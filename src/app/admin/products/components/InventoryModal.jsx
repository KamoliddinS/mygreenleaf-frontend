"use client";

import CustomInput from "@/app/components/CustomInput";
import Modal from "@/app/components/Modal";
import { usePostRequest } from "@/app/shared/hooks/requests";
import { INVENTORY } from "@/app/shared/utils/urls";
import { useForm } from "react-hook-form";

// ===============================
// REASONS DEFINED OUTSIDE
// ===============================
const ADD_REASONS = [
  { id: 1, name: "New shipment" },
  { id: 2, name: "Manual adjustment" },
  { id: 3, name: "Return from customer" },
];

const REMOVE_REASONS = [
  { id: 1, name: "Damaged item" },
  { id: 2, name: "Lost item" },
  { id: 3, name: "Manual adjustment" },
];

// ===============================
// INVENTORY MODAL
// ===============================
export const InventoryModal = ({ open, onClose, type, title, stock, pId, setInventroyData, setProductData }) => {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm();
  const postInventory = usePostRequest({url: INVENTORY})

  console.log(setProductData);
  


  const onSubmit = async (data) => {
   const {success, response} = await postInventory.request({
    data: {
        adjustment_type: type,
        quantity: data.quantity,
        reason: data.reason,
        product_id: pId
    }
   })
   if(success) {
    onClose()
    reset()
    setInventroyData?.((prev) => [...(prev || []), response]);
   }
  };

  const reasons = type === "Add" ? ADD_REASONS : REMOVE_REASONS;

  const handleClose = () => {
    onClose()
    reset()
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[400px] flex flex-col gap-[20px] p-[3px]"
      >
        {/* HEADER */}
        <div className="flex flex-col items-start gap-[4px]">
          <span className="text-[18px] font-[500]">{type} to Stock</span>
          <span className="text-[13px] text-gray-600">Item: {title}</span>
          <span className="text-[13px] text-gray-600">Current stock: {stock}</span>
        </div>

        {/* QUANTITY */}
        <CustomInput
          type="number"
          label="Quantity"
          placeholder="Enter quantity"
          value={watch("quantity") || ""}
          onChange={(v) => setValue("quantity", Number(v))}
        />

        {/* REASON SELECT */}
        <div className="flex flex-col w-full">
          <label className="text-[14px] font-medium mb-[4px]">Reason</label>
          <select
            {...register("reason")}
            className="border rounded-lg p-2 text-[14px] outline-none"
          >
            <option value="">Select reason</option>
            {reasons.map((r) => (
              <option key={r.id} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white rounded-xl py-2 mt-2 hover:bg-green-800 transition"
        >
          Confirm
        </button>
      </form>
    </Modal>
  );
};