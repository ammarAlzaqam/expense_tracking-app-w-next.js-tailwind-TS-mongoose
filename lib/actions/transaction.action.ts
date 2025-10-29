"use server";

import connectDB from "../mongoose";
import Transaction from "../models/transaction.model";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { FilterQuery } from "mongoose";
import mongoose from "mongoose";
import Category from "../models/category.model";

interface CreateTransactionParams {
  name: string;
  amount: number;
  startDate?: Date;
  category?: string | null;
  path: string;
}
export async function createTransaction({
  name,
  amount,
  startDate = new Date(),
  category = null,
  path,
}: CreateTransactionParams) {
  try {
    await connectDB();

    const headerStore = await headers();
    const isPremium = headerStore.get("x-user-isPremium") === "true";
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return {
        success: false,
        message: "Failed to create transaction: userId not found",
      };
    }

    if (!isPremium) {
      const transactionsCount = await Transaction.countDocuments({
        user: userId,
      });
      if (transactionsCount >= 2) {
        return {
          success: false,
          message: "Transaction limit reached. Upgrade to continue.",
        };
      }
    }

    let categoryId = null;
    if (category && mongoose.Types.ObjectId.isValid(category)) {
      categoryId = new mongoose.Types.ObjectId(category);
    }

    await Transaction.create({
      name,
      amount,
      user: userId,
      category: categoryId,
      startDate,
    });

    revalidatePath(path);
    return { success: true, message: "Transaction created successfully" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to create Transaction: Something went wrong",
    };
  }
}

interface FetchTransactionsParams {
  pageNumber?: number;
  searchString?: string;
  limit?: number;
  category?: string;
  range?: "" | "<100" | "100-1000" | ">1000";
  sortBy: "startDate" | "amount";
  sortOrder: 1 | -1;
  fromDate?: Date | null;
  toDate?: Date | null;
}
export async function fetchTransactions({
  pageNumber = 1,
  searchString = "",
  limit = 20,
  category = "",
  range = "",
  sortBy = "startDate",
  sortOrder = -1,
  fromDate = null,
  toDate = null,
}: FetchTransactionsParams) {
  try {
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      throw new Error("Failed to fetch transactions: Userid not found");
    }

    await connectDB();
    const skipAmount = limit * (pageNumber - 1);

    const query: FilterQuery<typeof Transaction> = { user: userId };

    if (searchString?.trim()) {
      const regex = new RegExp(searchString, "i");
      query.name = { $regex: regex };
    }

    if (mongoose.Types.ObjectId.isValid(category)) {
      query.category = new mongoose.Types.ObjectId(category);
    }

    switch (range) {
      case "<100": {
        query.amount = { $lt: 100 };
        break;
      }
      case "100-1000": {
        query.amount = { $gte: 100, $lte: 1000 };
        break;
      }
      case ">1000": {
        query.amount = { $gt: 1000 };
        break;
      }
      default: {
      }
    }

    if (fromDate && toDate) {
      query.startDate = { $gte: fromDate, $lte: toDate };
    } else if (fromDate) {
      query.startDate = { $gte: fromDate };
    } else if (toDate) {
      query.startDate = { $lte: toDate };
    }

    const sortOptions: Record<string, 1 | -1> = {};
    sortOptions[sortBy] = sortOrder;

    const transactions = await Transaction.find(query)
      .skip(skipAmount)
      .limit(limit)
      .sort(sortOptions)
      .populate({ path: "category", model: Category, select: "name _id" });

    const nofTransactions = await Transaction.countDocuments(query);
    const nofPages = Math.ceil(nofTransactions / limit);
    return { transactions, nofPages };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions: Something went wrong");
  }
}

interface UpdateTransactionParams {
  transactionId: string;
  name: string;
  amount: number;
  category: string;
  startDate: Date;
  path: string;
}
export async function updateTransaction({
  transactionId,
  name,
  amount,
  category,
  startDate,
  path,
}: UpdateTransactionParams) {
  try {
    await connectDB();
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      return { success: false, message: "User ID not found" };
    }

    const transaction = await Transaction.findOneAndUpdate(
      { _id: transactionId, user: userId },
      {
        name,
        amount,
        category,
        startDate,
      }
    );
    if (!transaction) {
      return { success: false, message: "Transaction not found" };
    }

    revalidatePath(path);
    return { success: true, message: "Transaction Updated successfully" };
  } catch (error) {
    console.error("Update transaction error:", error);
    return {
      success: false,
      message: "Something went wrong: Please tray again",
    };
  }
}

export async function deleteTransaction(transactionId: string, path: string) {
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

    const transaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      user: userId,
    });
    if (!transaction) {
      return {
        success: false,
        message: "Transaction not found",
      };
    }

    revalidatePath(path);

    return {
      success: true,
      message: "Transaction deleted successfully",
    };
  } catch (error) {
    console.error("Delete transaction error", error);
    return {
      success: false,
      message: "Something went wrong: Please try again",
    };
  }
}

export async function getUserFinanceSummary() {
  try {
    await connectDB();
    const headerStore = await headers();
    const userId = headerStore.get("x-user-id");
    if (!userId) {
      throw new Error("Failed to fetch transactions: User ID not found");
    }

    const summary = await Transaction.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $group: {
          _id: null,
          income: {
            $sum: {
              $cond: [
                {
                  $gt: ["$amount", 0],
                },
                "$amount",
                0,
              ],
            },
          },
          expenses: {
            $sum: {
              $cond: [
                {
                  $lt: ["$amount", 0],
                },
                "$amount",
                0,
              ],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          income: 1,
          expenses: 1,
          netBalance: { $add: ["$income", "$expenses"] },
        },
      },
    ]);
    return summary[0] || { netBalance: 0, income: 0, expenses: 0 };
  } catch (error) {
    console.error("get user finance error: ", error);
    throw new Error("Failed to fetch transactions: Something went wrong");
  }
}
