import { z } from "zod";
import ValidationMessages from "@/utils/server/config/validationMessages";

export const StateValidate = z.object({
  name: z.string().min(1, {
    message: ValidationMessages.requiredWithKey("State", "name"),
  }),
});

export const UnAssignFileValidate = z.object({
  stateId: z.string().min(1, {
    message: ValidationMessages.requiredWithKey("State", "Id"),
  }),
  fileIds: z
    .array(
      z.string().min(1, {
        message: ValidationMessages.requiredWithKey("File", "Id"),
      })
    )
    .min(1, {
      message: ValidationMessages.requiredWithKey("State", "File Ids"),
    }),
});
