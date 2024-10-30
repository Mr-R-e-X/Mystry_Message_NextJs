import { z } from "zod";

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Minimum password must be at least 6 characters" }),
});
