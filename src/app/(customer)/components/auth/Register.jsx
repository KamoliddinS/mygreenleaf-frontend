"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { usePostRequest } from "@/app/shared/hooks/requests";
import { REGISTER } from "@/app/shared/utils/urls";
import { toast } from "sonner";


export default function RegisterPage({onToggle}) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const postRegister = usePostRequest({url: REGISTER})

  const handleRegister = async () => {
    const data = { username, password, email };
    const {success, response} = await postRegister.request({
      data: {
        password: password,
        phone_number: username,
        email: email,
        delivery_method: "YandexTaxi"
      }
    })

    if (success) {
      const token = response?.tokens?.accessToken;
      const role = response?.user?.role;
      const userId = response?.user?.id

      // Save to localStorage 
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // Save to cookies (for middleware)
      document.cookie = `token=${token}; path=/;`;
      document.cookie = `role=${role}; path=/;`;

      // Redirect based on role
      if (role === "MasterAdmin") window.location.href = "/admin";
      else if (role === "Client") window.location.href = "/";
    } else {
      toast.error("Something went wrong !");
    }

    // 👉 Add your register API logic here
  };

  const handleRedirect = () => {
    onToggle(false)
  }

  return (
    <div className="w-full rounded-2xl">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h1>

        <div className="space-y-4">
         <div>
          <label className="text-gray-600 font-medium text-sm">Phone number</label>
            <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            placeholder="+998 91 234 56 78"
            value={username}
            onChange={(e) => {
              let val = e.target.value;
        
              // Remove everything except numbers
              val = val.replace(/\D/g, "");
        
              // Always force +998 prefix
              if (!val.startsWith("998")) {
                val = "998" + val;
              }
        
              // Limit to Uzbekistan phone number length (12 digits)
              val = val.slice(0, 12);
        
              // Format: +998 91 234 56 78
              let formatted = "+";
              if (val.length > 0) formatted += val.slice(0, 3);          // 998
              if (val.length > 3) formatted += " " + val.slice(3, 5);    // 91
              if (val.length > 5) formatted += " " + val.slice(5, 8);    // 234
              if (val.length > 8) formatted += " " + val.slice(8, 10);   // 56
              if (val.length > 10) formatted += " " + val.slice(10, 12); // 78
        
              setUsername(formatted);
            }}
            />
          </div>
          <div>
          <label className="text-gray-600 font-medium text-sm">Email</label>
            <input
            type="text"
            className="mt-1 w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="relative">
            <label className="text-gray-600 font-medium text-sm">Password</label>

             <input
               type={showPassword ? "text" : "password"}
               placeholder="Create a password"
               className="mt-1 w-full px-4 py-2 pr-12 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />

               {/* Eye Icon */}
               <button
                 type="button"
                 onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-[38px] text-gray-500 hover:text-gray-700"
               >
                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
               </button>
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
          <span onClick={handleRedirect} className="text-green-500 font-medium ml-1">
            Login
          </span>
        </p>
      </div>
  );
}