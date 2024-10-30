import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmails";
import { ApiResponse } from "@/types/apiResponse";
import ResetPasswordEmail from "../../emails/PasswordResetEmail";
import MessageEmail from "../../emails/MessageEmail";
import PasswordChangedConfirmation from "../../emails/PasswordChangedConfirmation";

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
      subject: "Mystry Message || Reset Password",
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

export async function messageReceived(
  username: string,
  content: string,
  email: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: process.env.RESEND_MAIL!,
      to: email,
      subject: "Mystry Message || New message",
      react: MessageEmail({ username, content }),
    });
    return {
      success: true,
      message: `A system generated mail has been sent to ${username}`,
    };
  } catch (error) {
    return { success: false, message: "Failed to send forgot password email" };
  }
}

export async function passwordChangedMail(username: string, email: string) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_MAIL!,
      to: email,
      subject: "Mystry Message || Password Updated",
      react: PasswordChangedConfirmation({ username, email }),
    });
    return {
      success: true,
      message: `A system generated mail has been sent to ${username}`,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to send password changed email",
    };
  }
}
