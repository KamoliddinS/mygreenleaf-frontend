"use client";

import { useState } from "react";
import { ProfileInfo } from "./components/Profile";
import { Orders } from "./components/Orders";

export default function Profile() {
  const [tab, setTab] = useState("profile");

  return (
    <div className="w-full flex flex-col gap-6 px-4 py-4">

      {/* Tabs */}
      <div className="flex gap-6 border-b">
        <button
          onClick={() => setTab("profile")}
          className={`pb-2 text-[15px] font-medium ${
            tab === "profile"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600"
          }`}
        >
          Profile
        </button>

        <button
          onClick={() => setTab("orders")}
          className={`pb-2 text-[15px] font-medium ${
            tab === "orders"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-600"
          }`}
        >
          Orders
        </button>
      </div>

      {/* Profile Content */}
      {tab === "profile" && (
        <ProfileInfo />
      )}

      {/* Orders Content */}
      {tab === "orders" && (
        <Orders />
      )}
    </div>
  );
}