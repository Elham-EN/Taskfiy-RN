import { z, ZodType } from "zod";
import { SignupFormData } from "../types/formDataTypes";

export const UserSchema: ZodType<SignupFormData> = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must at lest have 8 characters" }),
});
