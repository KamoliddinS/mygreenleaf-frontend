"use client";

import Modal from "@/app/components/Modal";
import CustomInput from "@/app/components/CustomInput";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhotoUploader from "@/app/components/PhotoUploader";
import { useGetRequest, usePostRequest } from "@/app/shared/hooks/requests";
import { BRAND, CATALOGUE, PRODUCTS } from "@/app/shared/utils/urls";
import { toast } from "sonner";

export const Create = ({ setData }) => {
  const [open, setOpen] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);
  const postProduct = usePostRequest({ url: PRODUCTS });

  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const getBrands = useGetRequest({ url: BRAND });
  const getCatalogue = useGetRequest({ url: CATALOGUE });
  const brands = getBrands.response || [];
  const catalogue = getCatalogue.response || [];

  // Convert file to Base64
  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]); // only base64
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Handle images selection
  const handleImages = (files) => {
    setValue("images", files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  // Format price
  const handlePriceChange = (value) => {
    const formatted = value.replace(/\D/g, "");
    setValue("price", formatted);
  };

  // Submit form
  const onSubmit = async (data) => {
    // Convert all images to Base64
    const product_images = await Promise.all(
      (data.images || []).map(async (file) => {
        const base64 = await convertFileToBase64(file);
        return { image_base64: base64 };
      })
    );

    const payload = {
      title: data.title,
      description: data.description,
      price: data.price,
      catalogue_id: data.catalogue,
      brand_id: data.brand,
      stock_count: data.stock,
      product_images, // send as array of objects
    };

    const { success, response } = await postProduct.request({ data: payload });

    if (success) {
      toast.success("Product added successfully");
      setOpen(false);
      setData?.((prev) => [...(prev || []), response]);
      reset();
      setImagePreviews([]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    getBrands.request();
    getCatalogue.request();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-white rounded-[10px] text-[14px] bg-green-700 py-[6px] px-[15px]"
      >
        + Add Product
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Uploader */}
            <div>
              <PhotoUploader onChange={handleImages} />
            </div>

            {/* Title */}
            <CustomInput
              label="Product Title"
              placeholder="Enter title"
              value={watch("title") || ""}
              onChange={(v) => setValue("title", v)}
            />

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                placeholder="Write short description..."
                className="w-full px-4 h-[70px] py-2 rounded-xl border border-gray-300 
                           focus:border-green-500 focus:ring-2 focus:ring-green-400 transition outline-none"
              ></textarea>
            </div>

            {/* Price + Brand */}
            <div className="flex gap-3">
              <div className="flex-1">
                <CustomInput
                  label="Price"
                  type="text"
                  placeholder="0"
                  value={watch("price") || ""}
                  onChange={handlePriceChange}
                />
              </div>

              <div className="w-36">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <select
                  {...register("brand")}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 
                             focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  {brands?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Stock + Catalogue */}
            <div className="flex gap-3">
              <div className="flex-1">
                <CustomInput
                  label="Stock"
                  type="text"
                  placeholder="0"
                  value={watch("stock") || ""}
                  onChange={(v) => setValue("stock", v)}
                />
              </div>
              <div className="w-36">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catalogue
                </label>
                <select
                  {...register("catalogue")}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 
                             focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  {catalogue?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Buttons */}
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
                Save Product
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};