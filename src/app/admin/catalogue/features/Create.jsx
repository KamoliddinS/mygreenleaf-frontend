"use client";

import Modal from "@/app/components/Modal";
import CustomInput from "@/app/components/CustomInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { usePostRequest } from "@/app/shared/hooks/requests";
import { CATALOGUE, PRODUCTS } from "@/app/shared/utils/urls";
import { toast } from "sonner";

export const Create = ({setData}) => {
  const [open, setOpen] = useState(false);
  const postProduct = usePostRequest({url: CATALOGUE})
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Submit form
  const onSubmit = async (data) => {
    console.log(data);
    
    const {success, response} = await postProduct.request({
        data: {
            title: data.title,
        }
    })
    if(success) {
      toast.success("Catalogue added successfully");
      setOpen(false)
      setData?.((prev) => [...(prev || []), response]);
      reset()
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white rounded-[10px] text-[14px] bg-green-700 py-[6px] px-[15px]"
      >
        + Add Catalogue
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[300px] max-w-xl">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Catalogue
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Title */}
            <CustomInput
              label="Catalogue Title"
              placeholder="Enter title"
              value={watch("title") || ""}
              onChange={(v) => setValue("title", v)}
            />

            {/* Submit Button */}
           <div className="w-full flex items-center gap-[10px]">
            <button
              onClick={() => setOpen(false)}
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
              Save
            </button>
           </div>
          </form>
        </div>
      </Modal>
    </>
  );
};