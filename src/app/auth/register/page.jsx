"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const data = { username, email, password };
    console.log("Register:", data);

    // 👉 Add your register API logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8 border border-gray-100">

        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        <div className="space-y-4">
          <div>
            <label className="text-gray-600 font-medium text-sm">Username</label>
            <input
              type="text"
              placeholder="Your name"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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

          <div>
            <label className="text-gray-600 font-medium text-sm">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full py-2.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold transition"
          >
            Register
          </button>
        </div>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?
          <a href="/auth/login" className="text-green-500 font-medium ml-1">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}