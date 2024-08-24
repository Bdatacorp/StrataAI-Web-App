import ValidationMessages from "@/utils/server/config/validationMessages";
import { z } from "zod";

const australianPhoneNumberRegex = /^(\+61|0)4\d{8}$/;

const CreateAdminValidate = z.object({
  name: z
    .string({ message: ValidationMessages.requiredWithKey("User", "name") })
    .min(1, {
      message: ValidationMessages.requiredWithKey("User", "name"),
    }),
  email: z
    .string({ message: ValidationMessages.requiredWithFelid("Email") })
    .min(1, {
      message: ValidationMessages.requiredWithFelid("Email"),
    })
    .email("Invalid email. Please check your email again !"),
  phone: z
    .string({
      message:
        "Invalid Australian phone number. Please check your phone number again!",
    })
    .refine((phone) => australianPhoneNumberRegex.test(phone), {
      message:
        "Invalid Australian phone number. Please check your phone number again!",
    }),
  password: z
    .string({ message: "Password must be at least 8 characters" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(15, { message: "Password must be at most 15 characters" }),
});

export default CreateAdminValidate;
