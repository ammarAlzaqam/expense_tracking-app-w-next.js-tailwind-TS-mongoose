import mongoose from "mongoose";

interface Category {
  _id: mongoose.Schema.Types.ObjectId;
  name: string;
  slug: string;
  user: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.index({ user: 1 });

const Category =
  mongoose.models.Category ||
  mongoose.model<Category>("Category", categorySchema);
export default Category;
