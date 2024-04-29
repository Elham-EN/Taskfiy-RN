import { z, ZodType } from "zod";
import { LoginFormData } from "../types/formDataTypes";

export const ForgotPasswordSchema: ZodType<{ email: string }> = z.object({
  email: z.string().email(),
});
