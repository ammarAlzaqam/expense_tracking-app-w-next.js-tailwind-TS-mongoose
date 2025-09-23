import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function createAndStoreTokenInCookie(userId: string) {
  const token = await new SignJWT({ userId: userId.toString() })
    .setExpirationTime("1d")
    .setProtectedHeader({ alg: "HS256" })
    .sign(new TextEncoder().encode(process.env.JWT_SECRET || "SECRET_@JWT#"));

  const cookieStorage = await cookies();
  cookieStorage.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}
