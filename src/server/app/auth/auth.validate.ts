import { z } from "zod";
import ValidationMessages from "../utils/config/validationMessages";

const AuthLoginValidate = z.object({
  email: z
    .string({ message: ValidationMessages.requiredWithFelid("Email") })
    .min(1, {
      message: ValidationMessages.requiredWithFelid("Email"),
    })
    .email("Invalid email. Please check your email again !"),
  password: z.string().min(1, {
    message: ValidationMessages.requiredWithFelid("Password"),
  }),
});

export default AuthLoginValidate;
