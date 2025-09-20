import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const isApiRoute = pathname.startsWith("/api");

  const data = await isAuthenticated(req);
  if (!data.success) {
    if (isApiRoute) {
      return NextResponse.json(
        { success: false, message: data.message },
        { status: 403 }
      );
    }

    return NextResponse.redirect(new URL("/signin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/transaction/:path*",
    "/api/auth/me",
    "/dashboard/:path*",
    // "/",
  ],
};

//! Is auth function
async function isAuthenticated(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token || !process.env.JWT_SECRET)
      return { success: false, message: "Not Authorized: token not found" };

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const userId = payload.userId as string;
    if (!userId)
      return { success: false, message: "Not Authorized: token not valid" };

    return { success: true, userId };
  } catch (error) {
    console.error(`Not Authorized: ${error}`);
    return { success: false, message: "Not Authorized" };
  }
}
