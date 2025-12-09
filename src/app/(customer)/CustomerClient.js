"use client";

import { useEffect } from "react";
import { checkTokenExpiration } from "../shared/utils/session";

export default function CustomerClient() {
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return null;
}