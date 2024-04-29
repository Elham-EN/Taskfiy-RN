import { z, ZodType } from "zod";
import { LoginFormData } from "../types/formDataTypes";

export const LoginUserSchema: ZodType<LoginFormData> = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password required"),
});
