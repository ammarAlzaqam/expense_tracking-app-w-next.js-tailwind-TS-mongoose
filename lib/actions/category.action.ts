"use server";
import Category from "../models/category.model";
import { headers } from "next/headers";
import connectDB from "../mongoose";
import { revalidatePath } from "next/cache";

interface CreateCategoryParams {
  name: string;
  slug: string;
  path: string;
}
export async function createCategory({
  name,
  slug,
  path,
}: CreateCategoryParams) {
  try {
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return {
        success: false,
        message: "UserId not found",
      };
    }

    await connectDB();
    const exists = await Category.findOne({ slug, user: userId });
    if (exists)
      return { success: false, message: "This slug has already been used" };

    await Category.create({ name, slug, user: userId });

    revalidatePath(path);
    return {
      success: true,
      message: "Category created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong: please try again",
    };
  }
}

export async function fetchAllCategories() {
  try {
    await connectDB();

    const headerStore = await headers();
    const userId = await headerStore.get("x-user-id");
    if (!userId) {
      throw new Error("Failed to fetch categories: userId not found");
    }

    const categories = await Category.find({ user: userId });

    return categories;
  } catch (error) {
    console.error(error);
  }
}
