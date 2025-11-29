import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;

  const pathname = req.nextUrl.pathname;

  // ---- PROTECT ADMIN ----
  if (pathname.startsWith("/admin")) {
    if (!token || role !== "MasterAdmin") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // ---- PROTECT CLIENT ----
  if (pathname.startsWith("/customer") || pathname.startsWith("/profile")) {
    if (!token || role !== "Client") {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/customer/:path*",
    "/profile/:path*",
  ],
};