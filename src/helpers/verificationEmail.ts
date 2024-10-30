import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/apiResponse";
import ResetPasswordEmail from "../../emails/PasswordResetEmail";

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: process.env.RESEND_MAIL!,
      to: email,
      subject: "Mystry Message || Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email --> ", error);
    return { success: false, message: "Failed to send verification email" };
  }
}

export async function sendForgotPasswordEmail(
  email: string,
  username: string,
  hashedToken: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: process.env.RESEND_MAIL!,
      to: email,
      subject: "Mystry Message || Forgot Password",
      react: ResetPasswordEmail({ username, email, hashedToken }),
    });
    return {
      success: true,
      message: `A reset password has been sent to ${email}`,
    };
  } catch (error) {
    return { success: false, message: "Failed to send forgot password email" };
  }
}
