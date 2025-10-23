"use server";
import Category from "../models/category.model";
import { headers } from "next/headers";
import connectDB from "../mongoose";
import { revalidatePath } from "next/cache";
import slugify from "slugify";
import Transaction from "../models/transaction.model";

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
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      throw new Error("User ID not found");
      // return {
      //   success: false,
      //   message: "User ID not found",
      // };
    }

    const categories = await Category.find({ user: userId });

    return categories;

    // return {
    //   categories: JSON.parse(JSON.stringify(categories)),
    //   success: true,
    // };
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong. Please try again")
    // return {
    //   success: false,
    //   message: "Something went wrong. Please try again",
    // };
  }
}

export async function updateCategory({
  name,
  slug,
  path,
}: {
  name: string;
  slug: string;
  path: string;
}) {
  try {
    await connectDB();
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return {
        success: false,
        message: "User ID not found",
      };
    }

    if (!name || !slug) {
      return {
        success: false,
        message: "Name and slug are required",
      };
    }

    const newSlug = slugify(name, { lower: true, strict: true });

    const category = await Category.findOneAndUpdate(
      { slug, user: userId },
      {
        name,
        newSlug,
      }
    );

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    revalidatePath(path);
    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error) {
    console.error("update category error: ", error);
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}

//! Delete Category
export async function deleteCategory({
  slug,
  path,
}: {
  slug: string;
  path: string;
}) {
  try {
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return {
        success: false,
        message: "User ID not found",
      };
    }

    await connectDB();
    const category = await Category.findOneAndDelete({ slug, user: userId });
    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    await Transaction.updateMany(
      { category: category._id, user: userId },
      {
        $unset: { category: 1 },
      }
    );

    revalidatePath(path);
    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("delete category error: ", error);
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
}
