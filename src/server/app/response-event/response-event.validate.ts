import ValidationMessages from "@/utils/server/config/validationMessages";
import { z } from "zod";

export const ReplyEventValidate = z.object({
  message: z.string().min(1, {
    message: ValidationMessages.requiredMessage(),
  }),
  requestId: z.string().min(1),
});
