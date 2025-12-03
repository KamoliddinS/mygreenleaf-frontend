"use client";

import { createContext, useContext, useState } from "react";

// 1️⃣ Create the context
const GlobalContext = createContext(null);

// 2️⃣ Create a provider component
export const GlobalProvider = ({ children }) => {
  // Example global states
  const [openCart, setOpenCart] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        openCart,
        setOpenCart
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// 3️⃣ Custom hook for easy access
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};