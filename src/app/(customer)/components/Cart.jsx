"use client";

import { X } from "lucide-react";
import { useCartStore } from "./store/cartStore";
import Image from "next/image";
import { Checkout } from "./Checkout";
import { useState } from "react";

export const CartPage = ({ open, onClose }) => {
  // ✅ Always call hooks first
  const [openCheck, setOpenCheck] = useState(false);
  const { cart = {}, addItem, removeItem, deleteItem } = useCartStore(); // use correct store method
  const cartItems = Object.values(cart);

  const subtotal = cartItems.reduce(
    (s, i) => s + (i.price || 0) * (i.qty || 1),
    0
  );
  const deliveryFee = cartItems.length > 0 ? 15000 : 0;
  const total = subtotal + deliveryFee;

  const increaseQty = (item) => addItem(item);
  const decreaseQty = (id) => removeItem(id);
  const safeDelete = (id) => deleteItem?.(id);

  // ✅ If cart is closed, render nothing
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[999] w-full h-full flex">
        <div className="bg-white w-full h-full flex flex-col rounded-none overflow-hidden">
          {/* HEADER */}
          <div className="flex items-center justify-between p-5 border-b bg-white">
            <h2 className="text-lg font-semibold">
              Shopping Cart ({cartItems.length})
            </h2>
            <button onClick={onClose} className="p-2">
              <X size={22} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500 pt-20 text-lg">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <div key={item.id || Math.random()} className="flex w-full gap-4 relative">
                  {/* DELETE BUTTON */}
                  {item.id && (
                    <button
                      onClick={() => safeDelete(item.id)}
                      className="absolute top-0 right-0 text-gray-400 hover:text-black"
                    >
                      <X size={18} />
                    </button>
                  )}

                  {/* IMAGE */}
                  <div className="w-[90px] h-[90px] rounded-xl overflow-hidden bg-gray-100">
                    {item?.productImages?.[0]?.imageUrl ? (
                      <Image
                        src={item.productImages[0].imageUrl}
                        className="w-full h-full object-cover"
                        width={90}
                        height={90}
                        alt={item.title || "product"}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>

                  {/* INFO */}
                  <div className="flex-1">
                    <p className="font-medium text-[15px]">{item.title || "No title"}</p>
                    <p className="text-gray-500 text-sm">{item.description || ""}</p>

                    <p className="font-semibold mt-1">
                      {(item.price || 0).toLocaleString()} UZS
                    </p>

                    <p className="text-gray-500 text-xs mb-2">
                      {(item.price || 0).toLocaleString()} × {item.qty || 1}
                    </p>

                    {/* QUANTITY */}
                    <div className="mt-1">
                      <div className="flex items-center gap-4 bg-[#f0f7ef] px-4 py-2 rounded-full w-fit">
                        <button
                          className="text-lg font-bold"
                          onClick={() => decreaseQty(item.id)}
                        >
                          −
                        </button>

                        <span>{item.qty || 1}</span>

                        <button
                          className="text-lg font-bold"
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* FOOTER */}
          {cartItems.length > 0 && (
            <div className="border-t p-5 bg-white">
              {/* SUMMARY */}
              <div className="pb-4 border-b text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>{subtotal.toLocaleString()} UZS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery Fee</span>
                  <span>{deliveryFee.toLocaleString()} UZS</span>
                </div>
              </div>

              <div className="flex justify-between my-4 text-lg font-bold">
                <span>Total</span>
                <span>{total.toLocaleString()} UZS</span>
              </div>

              <button
                onClick={() => setOpenCheck(true)}
                className="w-full py-4 bg-[#33683e] text-white rounded-xl text-[17px] font-medium"
              >
                Proceed to Checkout →
              </button>
            </div>
          )}
        </div>
      </div>

      <Checkout open={openCheck} onClose={() => setOpenCheck(false)} data={cartItems} />
    </>
  );
};