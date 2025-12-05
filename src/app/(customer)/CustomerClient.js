"use client";

import { useEffect } from "react";
import { checkTokenExpiration } from "../shared/utils/session";
import { useGlobalContext } from "./components/context/GlobalContext";

export default function CustomerClient() {
  const {setOpenDetail, setOpenProductModal} = useGlobalContext()
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const productId = params.get("product");

  if (productId) {
    // open modal automatically
    setOpenProductModal(productId);
    setOpenDetail(true)
  }
}, []);

  return null;
}