import mongoose from "mongoose";

interface User {
  _id: mongoose.Schema.Types.ObjectId;
  username: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
