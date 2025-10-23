import mongoose from "mongoose";

interface Transaction {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
  category: mongoose.Schema.Types.ObjectId;
  startDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new mongoose.Schema<Transaction>(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    startDate: {
      type: Date,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

transactionSchema.index({ user: 1 });

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model<Transaction>("Transaction", transactionSchema);

export default Transaction;
