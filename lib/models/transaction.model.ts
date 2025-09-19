import mongoose from "mongoose";

interface Transaction {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  amount: number;
  user: mongoose.Schema.Types.ObjectId;
  startDate: Date;
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
    startDate: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
