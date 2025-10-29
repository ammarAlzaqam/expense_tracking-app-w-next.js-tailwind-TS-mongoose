"use server";

import { cookies, headers } from "next/headers";
import connectDB from "../mongoose";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";
import PromoCode from "../models/promoCode.model";
import { generatePremiumCode } from "../utils";
import { createAndStoreTokenInCookie } from "../jose";

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

export async function UpgradeUserToPremium(code: string) {
  try {
    await connectDB();
    const codeData = (await PromoCode.findOne({ code })) as any;
    if (!codeData) {
      return {
        success: false,
        message: "Invalid code. Please check and try again.",
      };
    }
    if (codeData.usedBy) {
      return {
        success: false,
        message: "⚠️ This code has already been used.",
      };
    }

    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return {
        success: false,
        message: "User not authenticated.",
      };
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        isPremium: true,
      },
      { new: true }
    );
    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    codeData.usedBy = userId;
    await codeData.save();

    await createAndStoreTokenInCookie(userId, true);

    return {
      user: JSON.parse(JSON.stringify(user)),
      success: true,
      message: "🎉 Congratulations! Premium activated successfully.",
    };
  } catch (error) {
    console.error("Error upgrading user to premium:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function createPremiumCode() {
  try {
    await connectDB();
    const generatedCode = generatePremiumCode();
    const promo = await PromoCode.create({ code: generatedCode });

    return {
      code: promo.code,
      success: true,
      message: "Code generated successfully",
    };
  } catch (error) {
    console.error("Error create premium code:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
