import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

//! Is auth function
export async function isAuthenticated(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value as string;
    const JWT_SECRET = process.env.JWT_SECRET as string;
    if (!token || !JWT_SECRET)
      return { success: false, message: "Not Authorized: token not found" };

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );

    const userId = payload.userId as string;
    const isPremium = payload.isPremium as boolean;
    if (!userId)
      return { success: false, message: "Not Authorized: token not valid" };

    return { success: true, userId, isPremium };
  } catch (error) {
    console.error(`Not Authorized: ${error}`);
    return { success: false, message: "Not Authorized" };
  }
}
