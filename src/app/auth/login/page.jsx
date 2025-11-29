"use client";

import { usePostRequest } from "@/app/shared/hooks/requests";
import { AUTH } from "@/app/shared/utils/urls";
import { useState } from "react";
import { toast } from "sonner";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const auth = usePostRequest({ url: AUTH });

  const handleLogin = async () => {
    const data = { email, password };

    const { success, response } = await auth.request({ data });

    if (success) {
      const token = response?.tokens?.accessToken;
      const role = response?.user?.role;

      // Save to localStorage 
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      // Save to cookies (for middleware)
      document.cookie = `token=${token}; path=/;`;
      document.cookie = `role=${role}; path=/;`;

      // Redirect based on role
      if (role === "MasterAdmin") window.location.href = "/admin";
      else if (role === "Client") window.location.href = "/";
    } else {
      toast.error("Username or password incorrect");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8 border border-gray-100">
        
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Welcome Back
        </h1>

        <div className="space-y-4">
          
          {/* Email */}
          <div>
            <label className="text-gray-600 font-medium text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password with eye toggle */}
          <div>
            <label className="text-gray-600 font-medium text-sm">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition pr-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </span>
            </div>
          </div>

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?
          <a href="/auth/register" className="text-green-500 font-medium ml-1">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}