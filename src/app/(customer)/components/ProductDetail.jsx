"use client";

import { Plus, Minus, Share2, Star, UserIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCartStore } from "./store/cartStore";

export const ProductDetail = ({ open, onClose, data, image }) => {
  const [userRating, setUserRating] = useState(0);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { rating: 5, text: "Amazing product!" },
    { rating: 4, text: "Good quality, but a bit expensive." },
  ]);

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

  const handleCommentSubmit = () => {
    if (!commentText) return;
    setComments([...comments, { rating: userRating, text: commentText }]);
    setCommentText("");
    setShowComment(false);
    setUserRating(0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full h-full max-w-5xl mx-auto bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b z-10">
          <button
            onClick={onClose}
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
              <Image
                src={image}
                alt={data?.title}
                width={500}
                height={400}
                className="w-full h-full object-contain"
              />
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

                  <span className="text-gray-500">(203 reviews)</span>
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
                {comments.map((c, idx) => (
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
                              i <= c.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{c.text}</p>
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
                onClick={onClose}
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