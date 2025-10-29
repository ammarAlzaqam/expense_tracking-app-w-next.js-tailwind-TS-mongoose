import mongoose from "mongoose";

interface User {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  image: string;
  password: string;
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    image: {
      type: String,
      default: "/assets/user.svg",
    },

    password: {
      type: String,
      required: true,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
