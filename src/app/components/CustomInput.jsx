"use client";

export default function CustomInput({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  className = "",
}) {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {/* Input */}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl border
          border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-400
          outline-none transition bg-white text-gray-800
          shadow-sm hover:border-gray-400 ${className}`}
      />

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}