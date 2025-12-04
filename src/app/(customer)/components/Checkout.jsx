"use client";

import { useLoad, usePatchRequest } from "@/app/shared/hooks/requests";
import { ME, USER } from "@/app/shared/utils/urls";
import {
  CreditCard,
  Dot,
  MapPin,
  Truck,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useJsApiLoader } from "@react-google-maps/api";
import LocationModal from "./LocationModal";

export const Checkout = ({ open, onClose, data }) => {
  const [active, setActive] = useState("click");

  const [openLocationModal, setOpenLocationModal] = useState(false);
  const [userId, setUserId] = useState("");

  const getMe = useLoad({ url: ME }, []);
  const userInfo = getMe.response ? getMe.response : [];
  const setData = getMe.setResponse

  const postAddress = usePatchRequest({ url: `${USER}${userId}` });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDAfvQNep6qw_BRwuXS8XYGugJgpvSWduU",
    libraries: ["places"],
  });

  const handleLocationSelected = async (loc) => {
    const { success } = await postAddress.request({
      data: {
        address: loc.address,
        address_longitude: String(loc.longitude),
        address_latitude: String(loc.latitude),
      },
    });

    if (success) {
      toast.success("Address updated successfully");
      setOpenLocationModal(false);
      getMe.request()
    }
  };

  if (!open) return null;

  const subtotal = data.reduce(
    (s, i) => s + (i.price || 0) * (i.qty || 1),
    0
  );
  const deliveryFee = data.length > 0 ? 15000 : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] w-full h-full flex">
      <div className="bg-white w-full h-full flex flex-col rounded-none overflow-hidden">
        {/* HEADER */}
        <div className="flex items-center justify-between p-5 border-b bg-white">
          <h2 className="text-lg font-semibold">Checkout</h2>
          <button onClick={onClose} className="p-2">
            <X size={22} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 md:w-[70%] w-[100%] lg:w-[50%] mx-auto overflow-y-auto p-5 space-y-6">
          {data.length === 0 && (
            <p className="text-center text-gray-500 pt-20 text-lg">
              Your cart is empty
            </p>
          )}

          {/* Contact */}
          <div className="p-[20px] border rounded-[10px] flex flex-col items-start gap-[10px]">
            <span>Contact Information</span>
            <div className="py-[10px] px-[20px] w-full bg-green-600/20 rounded-[10px] flex items-center justify-between">
              <span className="text-[13px] text-green-900">{userInfo?.phoneNumber}</span>
              <span className="text-[12px] text-green-600">Verified</span>
            </div>
          </div>

          {/* Address */}
          <div className="p-[20px] border rounded-[10px] flex flex-col items-start gap-[10px]">
            <div className="w-full flex items-center justify-between">
              <span className="text-[16px]">Delivery Address</span>

              {/* ⭐ Change button opens modal */}
              <span
                className="text-[14px] font-[500] text-green-700 cursor-pointer"
                onClick={() => setOpenLocationModal(true)}
              >
                Change
              </span>
            </div>

            <div className="py-[15px] px-[30px] bg-green-600/20 rounded-[10px] w-full flex items-start gap-[15px]">
              <MapPin size={20} className="text-green-600 mt-[2px]" />
              <div className="flex w-full flex-col items-start gap-[10px]">
                <span className="font-[500]">Home</span>
                <span className="text-gray-400 w-full w-[70%] text-[14px]">
                  {userInfo?.address || "Please select your address"}
                </span>
              </div>
            </div>
          </div>

          {/* Delivery Method */}
          <div className="p-[20px] border rounded-[10px] flex flex-col items-start gap-[10px]">
            <span>Delivery Method</span>
            <div className="py-[15px] px-[20px] border rounded-[10px] border-2 w-full bg-green-600/20 flex items-center justify-between border-green-800">
              <div className="flex items-start gap-[10px]">
                <Truck size={20} className="text-green-600" />
                <div className="flex flex-col items-start gap-[5px]">
                  <span className="font-[500] text-[15px] text-green-900">Yandex Taxi Delivery</span>
                  <span className="text-gray-400 text-[14px]">Estimated delivery: 30-60 minutes</span>
                </div>
              </div>
              <span className="text-green-900 font-[500]">15,000 UZS</span>
            </div>
          </div>

          {/* Order Summary */}
          <div className="p-[20px] border rounded-[10px] flex flex-col items-start gap-[20px]">
            <span>Order Summary ({data?.length} items)</span>

            <div className="w-full flex flex-col items-center gap-[20px]">
              {data.map((item) => (
                <div
                  key={item.id || Math.random()}
                  className="flex w-full justify-between items-center gap-4 relative"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[60px] h-[60px] rounded-xl overflow-hidden bg-gray-100">
                      {item?.productImages?.[0]?.imageUrl ? (
                        <Image
                          src={item.productImages[0].imageUrl}
                          className="w-full h-full object-contain"
                          width={60}
                          height={60}
                          alt={item.title || "product"}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-medium text-md">{item.title}</p>
                      <p className="text-gray-500 text-xs mb-2">
                        {(item.price || 0).toLocaleString()} × {item.qty}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-md mt-1">
                    {(item.price || 0).toLocaleString()} UZS
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="p-[20px] border rounded-[10px] flex flex-col items-start gap-[20px]">
            <span>Payment Method</span>

            <div
              onClick={() => setActive("click")}
              className={`p-[15px] flex items-center gap-[10px] border border-2 rounded-[10px] ${
                active === "click" ? "border-green-800" : "pl-[50px]"
              } hover:border-green-800 w-full`}
            >
              {active === "click" && <Dot className="text-green-900" />}
              <div className="flex items-center gap-[10px]">
                <div className="p-[10px] rounded-[10px] bg-green-700/20">
                  <CreditCard size={15} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-[500]">Click</span>
                  <span className="text-gray-400 text-[12px]">Pay with Click cards</span>
                </div>
              </div>
            </div>

            <div
              onClick={() => setActive("payme")}
              className={`p-[15px] flex items-center gap-[10px] border border-2 rounded-[10px] ${
                active === "payme" ? "border-green-800" : "pl-[50px]"
              } hover:border-green-800 w-full`}
            >
              {active === "payme" && <Dot className="text-green-900" />}
              <div className="flex items-center gap-[10px]">
                <div className="p-[10px] rounded-[10px] bg-green-700/20">
                  <CreditCard size={15} />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-[14px] font-[500]">Payme</span>
                  <span className="text-gray-400 text-[12px]">Pay with Payme cards</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        {data.length > 0 && (
          <div className="border-t p-5 bg-white">
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

            <button className="w-full py-4 bg-[#33683e] text-white rounded-xl text-[17px] font-medium">
              Place order ({total.toLocaleString()} UZS)
            </button>
          </div>
        )}
      </div>

      {/* ⭐ Location Modal */}
      <LocationModal
        open={openLocationModal}
        setOpen={setOpenLocationModal}
        onLocationSelected={handleLocationSelected}
        isLoaded={isLoaded}
      />
    </div>
  );
};