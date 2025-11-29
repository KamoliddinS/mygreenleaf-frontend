"use client"
import { clearStorage } from "@/app/shared/utils/session";

export default function SettingPage() {
  return (
    <div>
      <button onClick={clearStorage}>Logout</button>
    </div>
  );
}