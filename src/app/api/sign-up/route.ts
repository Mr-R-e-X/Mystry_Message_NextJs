import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/verificationEmail";
import { signupSchema } from "@/schemas/signup.schema";

// sendVerificationEmail

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();

    // validate with zod
    const signupDetails = { username, email, password };
    const result = signupSchema.safeParse(signupDetails);
    if (!result.success) {
      const usernameErr =
        result.error.format().username?._errors.join(", ") || "";
      const emailErr = result.error.format().email?._errors.join(", ") || "";
      const passwordErr =
        result.error.format().password?._errors.join(", ") || "";
      const combinedErr = `${usernameErr}, ${emailErr}, ${passwordErr}`;

      return Response.json(
        {
          success: false,
          errors:
            combinedErr.length > 0
              ? combinedErr
              : "Please fill in all the required fields properly",
        },
        { status: 400 }
      );
    }

    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken!",
        },
        { status: 400 }
      );
    }
    const existingUserByEmail = await UserModel.findOne({ email });
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already verified with this email.",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessages: true,
        message: [],
      });
      await newUser.save();
    }

    // send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );
    console.log(emailResponse);
    if (!emailResponse.success) {
      return Response.json(
        { success: false, message: emailResponse.message },
        { status: 500 }
      );
    }
    return Response.json(
      {
        success: true,
        message:
          "User registered successfully. Please check your email for verification.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user --> ", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user.",
      },
      { status: 500 }
    );
  }
}
