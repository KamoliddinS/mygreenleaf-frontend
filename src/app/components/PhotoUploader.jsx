"use client";

import { useState } from "react";

export default function PhotoUploader({ onChange }) {
  const [previews, setPreviews] = useState([]);

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setPreviews(files.map((file) => URL.createObjectURL(file)));
    onChange(files);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Upload Photos
      </label>

      {/* Drag & Drop Card */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center
                   cursor-pointer hover:border-green-500 transition relative"
        onClick={() => document.getElementById("fileInput").click()}
      >
        <input
          type="file"
          id="fileInput"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />

        <p className="text-gray-500">
          Drag & drop images here, or click to select
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Maximum 5 files
        </p>
      </div>

      {/* Image Preview */}
      {previews.length > 0 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {previews.map((src, idx) => (
            <div key={idx} className="relative w-20 h-20 rounded-lg border overflow-hidden">
              <img
                src={src}
                className="w-full h-full object-cover"
                alt={`preview-${idx}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}