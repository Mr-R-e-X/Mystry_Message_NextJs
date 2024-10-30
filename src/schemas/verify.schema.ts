import { z } from "zod";

export const verifySchema = z.object({
  code: z
    .string()
    .length(6, { message: "verication code must be at least 6 digit" }),
});

// export const VerifyQuerySchema = z.object({
//   code: verifySchema,
// });
