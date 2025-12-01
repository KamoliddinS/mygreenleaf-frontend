"use client";

import Modal from "@/app/components/Modal";
import CustomInput from "@/app/components/CustomInput";
import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { usePostRequest } from "@/app/shared/hooks/requests";
import { BRAND } from "@/app/shared/utils/urls";
import { toast } from "sonner";

export const Create = ({ setData }) => {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(null);     // for preview
  const [base64, setBase64] = useState(null);       // for sending JSON

  const postBrand = usePostRequest({ url: BRAND });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // Convert file to Base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = useCallback((file) => {
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    convertToBase64(file);
    setValue("image", file);
  }, [setValue]);

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageUpload(file);
  };

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleImageUpload(file);
  };

  const onSubmit = async (data) => {
    const pureBase64 = base64.split(",")[1];
    const payload = {
      title: data.title,
      image_base64: pureBase64, // ← send Base64 as JSON
    };

    console.log("FINAL DATA TO BACKEND =>", payload);

    const { success, response } = await postBrand.request({
      data: payload, // ← JSON only!
    });

    if (success) {
      toast.success("Brand added successfully");
      setOpen(false);
      setData?.((prev) => [...(prev || []), response]);
      reset();
      setPreview(null);
      setBase64(null);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-white rounded-[10px] text-[14px] bg-green-700 py-[6px] px-[15px]"
      >
        + Add Brand
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-[300px] max-w-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Brand
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Modern Drag & Drop Uploader */}
<div
  className="border-2 border-dashed border-gray-300 rounded-xl p-4 
             flex flex-col items-center justify-center cursor-pointer 
             hover:border-green-500 transition"
  onDrop={(e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      convertToBase64(file);
    }
  }}
  onDragOver={(e) => e.preventDefault()}
  onClick={() => document.getElementById("brandImage").click()}
>
  {!preview ? (
    <p className="text-gray-500 text-center text-sm">
      Drag & drop image here <br />
      or <span className="text-green-600 font-semibold">click to upload</span>
    </p>
  ) : (
    <div className="relative w-full flex justify-center">
      <img
        src={preview}
        className="h-32 w-32 object-cover rounded-lg shadow-md"
        alt="preview"
      />
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPreview(null);
          setBase64(null);        // VERY IMPORTANT FIX
        }}
        className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
      >
        ✕
      </button>
    </div>
  )}

  <input
    id="brandImage"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {
      const file = e.target.files?.[0];
      if (file) {
        setPreview(URL.createObjectURL(file));
        convertToBase64(file);
      }
    }}
  />
</div>

            {/* Title */}
            <CustomInput
              label="Brand Title"
              placeholder="Enter title"
              value={watch("title") || ""}
              onChange={(v) => setValue("title", v)}
            />

            {/* Buttons */}
            <div className="w-full flex items-center gap-[10px]">
              <button
                onClick={() => {
                  setOpen(false);
                  setPreview(null);
                  setBase64(null);
                }}
                type="button"
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