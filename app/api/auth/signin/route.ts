import { createAndStoreTokenInCookie } from "@/lib/jose";
import User from "@/lib/models/user.model";
import connectDB from "@/lib/mongoose";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const connDBData = await connectDB();

    if (!connDBData.success) {
      return NextResponse.json(connDBData, { status: 500 });
    }

    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or password is incorrect",
        },
        {
          status: 400,
        }
      );
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or password is incorrect",
        },
        {
          status: 400,
        }
      );
    }

    //! create token /w jose && store it in cookie
    await createAndStoreTokenInCookie(user._id);

    return NextResponse.json(
      { success: true, message: "Signin successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(`Failed to signin: ${error}`);
    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
