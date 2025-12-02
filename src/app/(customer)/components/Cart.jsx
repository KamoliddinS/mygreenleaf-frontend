"use client";

import { X } from "lucide-react";
import { useCartStore } from "./store/cartStore";
import Image from "next/image";

export const CartPage = ({ open, onClose }) => {
    if (!open) return null;

    const {
        cart,         // object: {17:{}, 18:{}, 19:{}}
        addItem,      // increase quantity
        removeItem,    // decrease quantity OR remove?
        deletItem
    } = useCartStore();

    // Convert object → array
    const cartItems = Object.values(cart);

    // Calculate totals
    const subtotal = cartItems.reduce((s, i) => s + i.price * (i.qty || 1), 0);
    const deliveryFee = cartItems.length > 0 ? 15000 : 0;
    const total = subtotal + deliveryFee;


    // Buttons
    const increaseQty = (item) => addItem(item); // your store already accepts full item
    const decreaseQty = (id) => removeItem(id);  // your store removes or decreases qty

    return (
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

                    {cartItems.length === 0 && (
                        <p className="text-center text-gray-500 pt-20 text-lg">
                            Your cart is empty
                        </p>
                    )}

                    {cartItems.map(item => (
                        <div key={item.id} className="flex w-full gap-4 relative">

                            {/* DELETE BUTTON */}
                            <button
                                onClick={() => deletItem(item.id)}
                                className="absolute top-0 right-0 text-gray-400 hover:text-black"
                            >
                                <X size={18} />
                            </button>

                            {/* IMAGE */}
                            <div className="w-[90px] h-[90px] rounded-xl overflow-hidden bg-gray-100">
                                <Image
                                    src={item?.productImages[0]?.imageUrl}
                                    className="w-full h-full object-cover"
                                    width={30}
                                    height={30}
                                    alt={item.title}
                                />
                            </div>

                            {/* INFO */}
                            <div className="flex-1">
                                <p className="font-medium text-[15px]">{item.title}</p>
                                <p className="text-gray-500 text-sm">
                                    {item.description}
                                </p>

                                <p className="font-semibold mt-1">
                                    {item.price.toLocaleString()} UZS
                                </p>

                                <p className="text-gray-500 text-xs mb-2">
                                    {item.price.toLocaleString()} × {item.qty || 1}
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
                    ))}

                    {/* SUMMARY */}
                    {cartItems.length > 0 && (
                        <div className="pt-4 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Subtotal</span>
                                <span>{subtotal.toLocaleString()} UZS</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">Delivery Fee</span>
                                <span>{deliveryFee.toLocaleString()} UZS</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* FOOTER */}
                {cartItems.length > 0 && (
                    <div className="border-t p-5 bg-white">
                        <div className="flex justify-between mb-4 text-lg font-bold">
                            <span>Total</span>
                            <span>{total.toLocaleString()} UZS</span>
                        </div>

                        <button className="w-full py-4 bg-[#33683e] text-white rounded-xl text-[17px] font-medium">
                            Proceed to Checkout →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};