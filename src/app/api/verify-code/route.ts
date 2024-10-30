import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/user.model";
import { verifySchema } from "@/schemas/verify.schema";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    // validate with zod
    const codeResult = verifySchema.safeParse({ code });
    console.log(codeResult);
    if (!codeResult.success) {
      console.log(codeResult.error.format());
      const codeErr = codeResult.error.format().code?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            codeErr.length > 0
              ? codeErr.join(", ")
              : "Please fill the code properly",
        },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          success: true,
          message: "User verified successfully!",
        },
        { status: 200 }
      );
    } else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, Please sign up again to get a new code.",
        },
        { status: 400 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Invalid verification code",
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error verifying user --> \n", error);
    return Response.json(
      {
        success: false,
        message: "Failed to verify user",
      },
      { status: 500 }
    );
  }
}
