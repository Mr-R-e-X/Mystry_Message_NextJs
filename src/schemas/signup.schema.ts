import { z } from "zod";

export const userNameValidation = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(20, "Username can't be longer than 20 characters")
  .regex(
    /^[a-zA-Z0-9_]+$/,
    "Username must not contsain any special characters"
  );

export const UsernameQuerySchema = z.object({
  username: userNameValidation,
});

export const signupSchema = z.object({
  username: userNameValidation,
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(6, { message: "Minimum password must be at least 6 characters" }),
});
