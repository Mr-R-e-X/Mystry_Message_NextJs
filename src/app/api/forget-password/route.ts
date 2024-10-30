import { sendForgotPasswordEmail } from "@/helpers/verificationEmail";
import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email } = await request.json();
    const user = await UserModel.findOne({ email, username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    const token = await bcrypt.hash(user._id!.toString(), 10);
    user.forgotPasswordToken = token;
    user.forgotPasswordTokenExpiry = new Date(Date.now() + 3600000);
    await user.save();
    const sendMail = await sendForgotPasswordEmail(
      user.email,
      user.username,
      user.forgotPasswordToken
    );
    if (!sendMail.success) {
      return Response.json(
        {
          success: false,
          message: "Some unexpected error occurred, please try again",
        },
        {
          status: 500,
        }
      );
    }
    return Response.json(
      {
        success: true,
        message:
          "A reset password email sent to your email address. Please follow the given instructions in the mail to reset your password",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending forgot password email --> ", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
