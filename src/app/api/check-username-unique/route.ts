import dbConnect from "@/lib/db.connect";
import UserModel from "@/model/user.model";
import { UsernameQuerySchema } from "@/schemas/signup.schema";

export async function GET(request: Request) {
  await dbConnect(); // Connect to the database

  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    // Validate with Zod
    const validationResult = UsernameQuerySchema.safeParse({ username });

    if (!validationResult.success) {
      const usernameErrors =
        validationResult.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors.length > 0
              ? usernameErrors.join(", ")
              : "Invalid query parameters",
        },
        { status: 400 }
      );
    }

    // Check if the username already exists
    const existingUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "User with this username already exists.",
        },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      message: "Username is unique.",
    });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        success: false,
        message: "Error checking username.",
      },
      { status: 500 }
    );
  }
}
