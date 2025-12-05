"use client";

import { Plus, Minus, Share2, Star, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "./store/cartStore";
import { useLoad, usePostRequest } from "@/app/shared/hooks/requests";
import { RATING } from "@/app/shared/utils/urls";
import { toast } from "sonner";
import { useGlobalContext } from "./context/GlobalContext";

const ImageSlider = ({ images }) => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[425px] overflow-hidden rounded-xl bg-gray-100 shadow-md">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-[425px] flex items-center justify-center">
            <Image
              src={img.imageUrl || img} // backend format flexible
              width={600}
              height={450}
              alt="Product Image"
              className="object-contain w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* Left button */}
      {images.length > 1 && (
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
        >
          ‹
        </button>
      )}

      {/* Right button */}
      {images.length > 1 && (
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-2 rounded-full shadow-md"
        >
          ›
        </button>
      )}

      {/* Pagination dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              index === i ? "bg-green-600 scale-110" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const ProductDetail = ({ open, onClose, data }) => {
  const [token, setToken] = useState('')
  const [userId, setUserId] = useState('')
  const [userRating, setUserRating] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const postRating = usePostRequest({url: RATING})
  const loadRating = useLoad({url: RATING, params: {product_id: data?.id}}, [])
  const rating = loadRating?.response ? loadRating?.response : []
  const setData = loadRating?.setResponse
  const {setOpenCart} = useGlobalContext()

  useEffect(() => {
    const tokenInfo = localStorage.getItem("token")
    const userIdInfo = localStorage.getItem("userId")
    setToken(tokenInfo)
    setUserId(userIdInfo)
  }, [])
  

  // Zustand cart
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);
  const qty = useCartStore((s) => s.cart[data?.id]?.qty || 0);

  // Lock background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => (document.body.style.overflow = "auto");
  }, [open]);

  if (!open) return null;

  const handleStarClick = (value) => {
    setUserRating(value);
    setShowComment(true);
  };

  const handleCommentSubmit = async () => {
    if (!commentText) return;
    if(!token) { 
      toast.warning("Please login or register to add comment")
    }
    const {success, response} = await postRating.request({
      data: {
        product_id: data?.id,
        user_id: userId,
        value: userRating,
        commentary: commentText
      }
    })
    if(success) {
      toast.success("Ovozingiz uchun rahmat !")
      setCommentText("");
      setShowComment(false);
      setUserRating(0);
      setData?.((prev) => [...(prev || []), response]);
    }
  };

  const handleRedirect = () => {
    if(!token) {
      toast.warning("Please register or login to order !")
    } else {
      onClose()
    setOpenCart(true)
    }
    
  }

  const handleClose = () => {
    onClose()
    setCommentText("")
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="relative w-full h-full max-w-5xl mx-auto bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b z-10">
          <button
            onClick={handleClose}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            &times;
          </button>

          <button
            onClick={() => console.log("Share clicked")}
            className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="pt-[60px] pb-[120px] overflow-auto h-full px-4">
          <div className="w-full flex flex-col items-center gap-[20px]">
            <div className="w-full h-[425px]">
              <ImageSlider images={data?.productImages || []} />
            </div>

            <div className="w-full flex flex-col gap-[15px]">
              <div className="w-full flex flex-col gap-[10px] pb-[20px] border-b">
                <span className="text-[16px] font-medium">{data?.title}</span>

                <span className="text-gray-500 text-[14px]">
                  {data?.description}
                </span>

                <div className="flex items-center gap-[10px]">
                  <div className="flex items-center gap-[5px]">
                    <Star size={20} className="text-yellow-400" />
                    <span>4.9</span>
                  </div>

                  <span className="text-gray-500">({rating?.length} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="w-full flex pb-[20px] pt-[10px] border-b flex-col">
                <span className="text-[30px]">
                  {data?.price?.toLocaleString()} UZS
                </span>
                <span className="text-[14px] text-gray-400">per piece</span>
              </div>

              {/* About */}
              <div className="w-full flex pb-[20px] pt-[10px] border-b flex-col">
                <span className="text-[17px] font-[500]">About this product</span>
                <span className="text-[14px] text-gray-400">
                  {data?.description}
                </span>
              </div>

              {/* Rating & Comments */}
              <div className="flex flex-col gap-3 py-4">
                <span className="font-medium">Rate this product:</span>

                {/* Stars */}
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 cursor-pointer ${
                        i <= userRating ? "text-yellow-400" : "text-gray-300"
                      }`}
                      onClick={() => handleStarClick(i)}
                    />
                  ))}
                </div>

                {/* Comment input */}
                {showComment && (
                  <div className="mt-3 flex flex-col gap-2">
                    <textarea
                      className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Write your comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button
                      onClick={handleCommentSubmit}
                      className="self-end px-4 py-2 bg-green-700 text-white rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>

              {/* Comments list */}
              <div className="flex rounded-[5px] flex-col gap-[30px] mt-4">
                {rating.map((c, idx) => (
                  <div key={idx} className="flex items-center gap-[10px]">
                    <div className="p-2 border rounded-[20px]">
                      <UserIcon size={15} className="text-gray-600/50" />
                    </div>

                    <div className="flex flex-col">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i <= c.value
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{c.commentary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center px-4 py-3 bg-white/80 backdrop-blur-md border-t z-10">

          {qty === 0 ? (
            // ADD BUTTON
            <button
              onClick={() => addItem(data)}
              className="flex w-full items-center justify-center gap-2 px-4 py-3 rounded-lg bg-green-700 text-white font-semibold"
            >
              <Plus className="w-5 h-5" />
              Add to Cart
            </button>
          ) : (
            // COUNTER + DONE BUTTON
            <div className="flex items-center justify-between w-full gap-3">

              {/* Counter */}
              <div className="flex items-center bg-green-600 text-white rounded-full px-4 py-2 gap-4">
                <button
                  onClick={() => removeItem(data.id)}
                  className="hover:bg-green-700 p-1 rounded-full"
                >
                  <Minus size={18} />
                </button>

                <span className="text-lg font-semibold">{qty}</span>

                <button
                  onClick={() => addItem(data)}
                  className="hover:bg-green-700 p-1 rounded-full"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* DONE BUTTON */}
              <button
                onClick={handleRedirect}
                className="flex items-center justify-center px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};