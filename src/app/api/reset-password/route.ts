import bcrypt from "bcryptjs";
import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/user.model";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { password, hashedToken } = await request.json();

    const user = await UserModel.findOne({
      forgotPasswordToken: hashedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "Token Expired, generate a new link using reset password.",
        },
        { status: 401 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    user.forgotPasswordToken = "";
    user.forgotPasswordTokenExpiry = new Date(1970, 6, 4);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Password changed successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error changing password --> ", error);
    return Response.json(
      { success: false, message: "Failed to change password" },
      { status: 500 }
    );
  }
}
