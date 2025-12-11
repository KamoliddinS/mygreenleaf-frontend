"use client"
import { clearStorage } from "@/app/shared/utils/session";

export default function SettingPage() {
  return (
    <div className="border rounded-[10px] flex flex-col items-start px-4 py-4 gap-[20px]">
       <span className="text-[19px] font-[600]">Account Managment</span>
       <span className="w-full border border-gray-500"></span>
       <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start gap-[10px]">
          <span className="text-[15px] font-[500]">Logout</span>
          <span className="text-[14px] text-gray-500">End the current session and return to sign-in</span>
        </div>
        <button onClick={clearStorage} className="px-4 py-2 border border-1 text-[15px] rounded-[10px] border-red-600 text-red-600">Logout</button>
       </div>
    </div>
  );
}