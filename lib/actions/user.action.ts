"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout() {
  try {
    const cookieStorage = await cookies();
    cookieStorage.delete("token");
    return { success: true, message: "Logout successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Logout failed: Something went wrong" };
  }
}
