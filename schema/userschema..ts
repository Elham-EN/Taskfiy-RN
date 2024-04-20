import { z, ZodType } from "zod";
import { SignupFormData } from "../types/formDataTypes";

export const UserSchema: ZodType<SignupFormData> = z.object({
  fullname: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must at lest have 8 characters" })
    .refine(
      (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
      },
      {
        message:
          "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.",
      }
    ),
});
