import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createAndStoreTokenInCookie } from "@/lib/jose";

export async function POST(req: NextRequest) {
  const { username, email, password, confirmPassword } = await req.json();

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        success: false,
        message: "Password doesn't match",
      },
      { status: 400 } //! Bad Request
    );
  }

  try {
    //! Connect to DB
    const { success, message } = await connectDB();

    if (!success)
      return NextResponse.json({ success: false, message }, { status: 500 }); //! Internal Server Error

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { success: false, message: "You already have an account" },
        { status: 409 } //! Conflict
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    //! create token /w jose && store it in cookie
    await createAndStoreTokenInCookie(newUser._id);

    return NextResponse.json(
      { success: true, message: "Signup successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(`Failed to signup: ${error}`);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
