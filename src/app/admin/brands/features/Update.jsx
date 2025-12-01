"use client";

import { useState, useCallback } from "react";
import { Edit } from "../../components/svgs/Svgs";
import Modal from "@/app/components/Modal";
import CustomInput from "@/app/components/CustomInput";
import { useForm } from "react-hook-form";
import {  usePatchRequest } from "@/app/shared/hooks/requests";
import { BRAND } from "@/app/shared/utils/urls";
import { toast } from "sonner";

export const Update = ({ id, data, setData }) => {
  const { handleSubmit, setValue, watch, reset } = useForm();
  const [open, setOpen] = useState(false);

  // Image upload state
  const [preview, setPreview] = useState(null);
  const [base64, setBase64] = useState(null);

  const updateBrand = usePatchRequest({ url: `${BRAND}${id}` });

  const handleOpen = () => {
    setOpen(true);
    reset({ title: data?.title || "" });
    setPreview(null); // user can upload new image
    setBase64(null);
  };

  const handleClose = () => setOpen(false);

  // Convert file to Base64
  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => setBase64(reader.result);
    reader.readAsDataURL(file);
  };

  const handleImageUpload = useCallback(
    (file) => {
      if (!file) return;
      setPreview(URL.createObjectURL(file));
      convertToBase64(file);
      setValue("image", file);
    },
    [setValue]
  );

  const onDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    handleImageUpload(file);
  };

  const onFileSelect = (e) => {
    const file = e.target.files?.[0];
    handleImageUpload(file);
  };

  const onUpdate = async (formData) => {
    const payload = { title: formData.title };

    if (base64) payload.image_base64 = base64.split(",")[1]; // send new image if uploaded

    const { success, response } = await updateBrand.request({ data: payload });

    if (success) {
      toast.success("Brand updated successfully");

      // Add updatedAt timestamp for cache-busting
      const updatedItem = {
        ...response,
        updatedAt: Date.now(),
      };

      setData((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
      );

      setOpen(false);
      setPreview(null);
      setBase64(null);
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
            Update Brand
          </h2>

          <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
            {/* Image uploader */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-xl p-4 
                         flex flex-col items-center justify-center cursor-pointer 
                         hover:border-green-500 transition"
              onDrop={onDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => document.getElementById(`brandImage-${id}`).click()}
            >
              {!preview ? (
                <p className="text-gray-500 text-center text-sm">
                  Drag & drop image here <br />
                  or{" "}
                  <span className="text-green-600 font-semibold">click to upload</span>
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
                      setBase64(null);
                    }}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}

              <input
                id={`brandImage-${id}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFileSelect}
              />
            </div>

            {/* Title */}
            <CustomInput
              label="Brand Title"
              placeholder="Enter title"
              value={watch("title")}
              onChange={(v) => setValue("title", v)}
            />

            {/* Buttons */}
            <div className="w-full flex items-center gap-[10px]">
              <button
                onClick={handleClose}
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
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};