"use server";

import { cookies, headers } from "next/headers";
import connectDB from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

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

export async function updateProfileImg(image: string, path: string) {
  try {
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id") as string;
    if (!userId)
      return {
        success: false,
        message: "Failed to update profile photo: userId not found",
      };

    await connectDB();
    const user = await User.findByIdAndUpdate(
      userId,
      {
        image,
      },
      { new: true }
    ).lean();
    if (!user)
      return {
        success: false,
        message: "Failed to update profile photo: user not found",
      };

    revalidatePath(path);
    return {
      success: true,
      user: JSON.parse(JSON.stringify(user)),
      message: "Profile photo updated successfully",
    };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update profile photo" };
  }
}

export async function updateProfileData({
  username,
  email,
  path,
}: {
  username: string;
  email: string;
  path: string;
}) {
  try {
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId)
      return {
        success: false,
        message: "Failed to update profile data: userId not found",
      };

    await connectDB();
    const user = await User.findByIdAndUpdate(
      userId,
      {
        username,
        email,
      },
      { new: true }
    ).lean();
    if (!user)
      return {
        success: false,
        message: "Failed to update profile data: user not found",
      };

    revalidatePath(path);
    return {
      success: true,
      user: JSON.parse(JSON.stringify(user)),
      message: "Profile data updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update profile data: Something went later",
    };
  }
}

export async function updateProfilePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  try {
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return {
        success: false,
        message: "Failed to update profile password: userId not found",
      };
    }

    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return {
        success: false,
        message: "Failed to update profile password: user not found",
      };
    }

    const isPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isPassword) {
      return {
        success: false,
        message:
          "Failed to update profile password: The current password is not correct",
      };
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return { success: true, message: "Update profile password successfully" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to update profile password: Something went wrong",
    };
  }
}
