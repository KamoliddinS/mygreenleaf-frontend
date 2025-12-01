"use client";

import { Star, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ProductDetail } from "./ProductDetail";
import { useCartStore } from "./store/cartStore";

export default function ProductCard({
  title,
  description,
  price,
  tag,
  rating = 0,
  reviews = 0,
  data
}) {
  const [open, setOpen] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const qty = useCartStore((state) => state.cart[data?.id]?.qty || 0);

    const firstImage = data.productImages?.[0]?.imageUrl
    ? `${data.productImages[0].imageUrl}`
    : null;

  return (
    <>
      <div
        className="
          w-full bg-white rounded-3xl border border-gray-200 overflow-hidden
          shadow-sm transition-all duration-300 
          hover:shadow-xl hover:border-gray-300
          group
        "
      >
        {/* Image */}
        <div
          className="relative w-full h-64 cursor-pointer overflow-hidden"
          onClick={() => setOpen(true)}
        >
          <Image
            src={firstImage}
            alt={title}
            fill
            className="
              object-contain transition-transform duration-300 
              group-hover:scale-105
            "
          />

          {/* Tag */}
          {tag && (
            <span className="absolute top-3 left-3 px-3 py-1 rounded-lg bg-green-100 text-green-800 text-xs font-medium">
              {tag}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">

          {/* Title */}
          <h3
            onClick={() => setOpen(true)}
            className="text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-700"
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-500 text-sm mt-1">
  {description?.split(" ").length > 5
    ? description.split(" ").slice(0, 5).join(" ") + "…"
    : description}
</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-gray-900 font-medium">{rating}</span>
            <span className="text-gray-500 text-sm">({reviews})</span>
          </div>

          {/* Price + Add */}
          <div className="flex items-center justify-between mt-4">
            <div>
              <p className="text-xl font-bold text-gray-900">
                {price?.toLocaleString()} UZS
              </p>
              <p className="text-gray-400 text-xs -mt-1">piece</p>
            </div>

            {/* If qty = 0 → show Add button */}
            {qty === 0 ? (
              <button
                onClick={() => data?.id && addItem(data)}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition"
              >
                <Plus size={16} />
                Add
              </button>
            ) : (
              // Modern Counter UI
              <div className="flex items-center bg-green-600 text-white rounded-full px-3 py-2 gap-4 shadow-md transition">
                
                {/* Decrease */}
                <button
                  onClick={() => data?.id && removeItem(data?.id)}
                  className="hover:bg-green-700 p-1 rounded-full"
                >
                  <Minus size={16} />
                </button>

                {/* Count */}
                <span className="text-lg font-semibold">{qty}</span>

                {/* Increase */}
                <button
                  onClick={() => data?.id && addItem(data)}
                  className="hover:bg-green-700 p-1 rounded-full"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <ProductDetail
        open={open}
        onClose={() => setOpen(false)}
        data={data}
        image={firstImage}
      />
    </>
  );
}