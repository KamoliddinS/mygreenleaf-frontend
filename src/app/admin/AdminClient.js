"use client";

import { useEffect } from "react";
import { checkTokenExpiration } from "../shared/utils/session";

export default function AdminClient() {
  useEffect(() => {
    checkTokenExpiration();
  }, []);

  return null;
}