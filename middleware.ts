import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isApiRoute = pathname.startsWith("/api");
  const isAuthPage =
    pathname.startsWith("/signin") || pathname.startsWith("/signup");

  const data = await isAuthenticated(req);
  if (data.success) {
    if (isAuthPage) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: data.message },
        { status: 403 }
      );
    }
    if (!isAuthPage) {
      return NextResponse.redirect(new URL("/signin", req.url));
    }
  }

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", data.userId || "");
  requestHeaders.set("x-user-isPremium", data.isPremium?.toString() || "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    "/api/transaction/:path*",
    "/api/auth/me",
    "/signin",
    "/signup",
    "/",
    "/dashboard/:path*",
    "/profile/:path*",
  ],
};
