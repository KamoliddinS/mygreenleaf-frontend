"use client";
import Modal from "@/app/components/Modal";
import CustomInput from "@/app/components/CustomInput";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PhotoUploader from "@/app/components/PhotoUploader";
import { useGetRequest, usePatchRequest } from "@/app/shared/hooks/requests";
import { BRAND, CATALOGUE, PRODUCTS } from "@/app/shared/utils/urls";
import { toast } from "sonner";
import { Edit } from "../../components/svgs/Svgs";

export const Update = ({ setData, id, data }) => {
  const [open, setOpen] = useState(false);
  const [base64Images, setBase64Images] = useState([]);
  const updateProduct = usePatchRequest({ url: `${PRODUCTS}/${id}` });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const getBrands = useGetRequest({ url: BRAND });
  const getCatalogue = useGetRequest({ url: CATALOGUE });
  const brands = getBrands.response || [];
  const catalogue = getCatalogue.response || [];

  // Convert file to base64
  const convertFileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Handle Image Upload
  const handleImageUpload = async (files) => {
    if (!files || files.length === 0) return;
    const base64 = await convertFileToBase64(files[0]); // only single new image
    setBase64Images([base64]);
    setValue("images", files);
  };

  // Format Price
  const handlePriceChange = (value) => {
    const formatted = value.replace(/\D/g, "");
    setValue("price", formatted);
  };

  // Submit form
  const onSubmit = async (formData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      catalogue_id: formData.catalogue,
      brand_id: formData.brand,
      stock_count: formData.stock,
      barcode: formData.barcode,
      ...(base64Images.length > 0 && {
        product_images: base64Images.map((img) => ({ image_base64: img })),
      }),
    };

    const { success, response } = await updateProduct.request({ data: payload });

    if (success) {
      toast.success("Product updated successfully");
      setOpen(false);
      setData?.((prev) =>
        prev.map((item) => (item.id === response.id ? response : item))
      );
      reset();
      setBase64Images([]);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    getBrands.request();
    getCatalogue.request();

    reset({
      title: data?.title || "",
      description: data?.description || "",
      price: data?.price || "",
      stock: data?.stockCount || "",
      catalogue: data?.catalogueId || 0,
      brand: data?.brandId || 0,
      barcode: data?.barcode || ""
    });
    setBase64Images([]);
  };

  // Set default brand and catalogue
  useEffect(() => {
    if (brands.length > 0 && data?.brandId) setValue("brand", data.brandId);
  }, [brands]);

  useEffect(() => {
    if (catalogue.length > 0 && data?.catalogueId) setValue("catalogue", data.catalogueId);
  }, [catalogue]);

  return (
    <>
      <button onClick={handleOpen}>
        <Edit />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Update Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Image Uploader */}
            <div>
              <PhotoUploader onChange={handleImageUpload} />
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
                className="w-full px-4 h-[70px] py-2 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-400 transition outline-none"
              ></textarea>
            </div>

            <CustomInput
              label="Barcode"
              placeholder="Enter barcode"
              value={watch("barcode") || ""}
              onChange={(v) => {
                // keep string, restrict to numeric characters
                const cleaned = v.replace(/\D/g, "");
                setValue("barcode", cleaned);
              }}
            />

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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  {brands?.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Catalog + Stock */}
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
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-400 outline-none"
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
                className="w-[50%] mt-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
                type="button"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-[50%] mt-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition"
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