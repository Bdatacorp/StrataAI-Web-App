import { z } from "zod";
import ValidationMessages from "@/utils/server/config/validationMessages";
import { UserType } from "./auth.types";

export const AuthLoginValidate = z.object({
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

const australianPhoneNumberRegex = /^(\+61|0)4\d{8}$/;

export const AuthRegiterValidate = z.object({
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
  type: z.enum([UserType.MANAGER, UserType.OWNER], {
    message: "Invalid user type. Valid types are Manager and Owner",
  }),
  stateId: z
    .string({
      message: "Please select a one of state",
    })
    .min(1, {
      message: "Please select a one of state",
    }),
  acceptTerms: z
    .boolean({ message: "Please accept terms and conditions" })
    .refine((val) => val === true, {
      message: "Please accept terms and conditions",
    }),
});

export const AuthUserValidate = z.object({
  email: z
    .string({ message: ValidationMessages.requiredWithFelid("Email") })
    .min(1, {
      message: ValidationMessages.requiredWithFelid("Email"),
    })
    .email("Invalid email. Please check your email again !"),
});
