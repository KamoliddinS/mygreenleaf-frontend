"use client";
import Modal from "@/app/components/Modal";
import CustomInput from "@/app/components/CustomInput";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// import PhotoUploader from "@/app/components/PhotoUploader";
import { useGetRequest, usePutRequest } from "@/app/shared/hooks/requests";
import { BRAND, CATALOGUE, PRODUCTS } from "@/app/shared/utils/urls";
import { toast } from "sonner";
import { Edit } from "../../components/svgs/Svgs";

export const Update = ({setData, id, data}) => {
  const [open, setOpen] = useState(false);
  // const [imagePreviews, setImagePreviews] = useState([]);
  const updateProduct = usePutRequest({url: `${PRODUCTS}/${id}`})
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const getBrands = useGetRequest({url: BRAND})
  const getCatalogue = useGetRequest({url: CATALOGUE})
  const brands = getBrands.response ? getBrands.response : []
  const catalogue = getCatalogue.response ? getCatalogue.response : []

  // Handle Image Upload
  // const handleImages = (e) => {
  //   const files = Array.from(e.target.files);
  //   setValue("images", files);

  //   const previews = files.map((file) => URL.createObjectURL(file));
  //   setImagePreviews(previews);
  // };

  // Format Price
  const handlePriceChange = (value) => {
    const formatted = value.replace(/\D/g, "");
    setValue("price", formatted);
  };

  // Submit form
  const onSubmit = async (data) => {    
    const {success, response} = await updateProduct.request({
        data: {
            title: data.title,
            description: data.description,
            price: data.price,
            catalogue_id: data.catalogue,
            brand_id: data.brand,
            stock_count: data.stock
        }
    })
    if(success) {
      toast.success("Product updated successfully");
      setOpen(false)
       setData?.((prev) =>
        prev.map((item) => (item.id === response.id ? response : item))
      );
      reset()
    }
  };

  console.log(data);
  

  const handleOpen = () => {
    setOpen(true)
    getBrands.request()
    getCatalogue.request()
    reset({
        title: data?.title || "",
        description: data?.description || "",
        price: data?.price || "",
        stock: data?.stockCount || "",
        catalogue: data?.catalogueId || 0,
        brand: data?.brandId || 0
    })
  }

  // When brands load, set default brand
useEffect(() => {
  if (brands.length > 0 && data?.brandId) {
    setValue("brand", data.brandId);
  }
}, [brands]);

// When catalogues load, set default catalogue
useEffect(() => {
  if (catalogue.length > 0 && data?.catalogueId) {
    setValue("catalogue", data.catalogueId);
  }
}, [catalogue]);

  return (
    <>
      <button
        onClick={handleOpen}
      >
        <Edit />
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="w-full max-w-xl">

          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Add New Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Image Uploader */}
            {/* <div>
              <PhotoUploader onChange={(files) => setValue("images", files)} />
              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {imagePreviews.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  ))}
                </div>
              )}
            </div> */}

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

            {/* Price + Currency */}
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
                    <option key={item.id} value={item.id}>{item.title}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Catalog Selector */}
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
                  <option key={item.id} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            </div>

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
              Save Product
            </button>
           </div>
          </form>
        </div>
      </Modal>
    </>
  );
};