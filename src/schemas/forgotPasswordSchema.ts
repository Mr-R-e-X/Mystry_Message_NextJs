import { z } from "zod";
import { userNameValidation } from "./signup.schema";

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  username: userNameValidation,
});
