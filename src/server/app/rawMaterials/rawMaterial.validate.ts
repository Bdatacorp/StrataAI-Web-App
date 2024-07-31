import { z } from "zod";
import ValidationMessages from "../utils/config/validationMessages";

const RawMaterialsValidate = z.object({
  title: z.string().min(1, {
    message: ValidationMessages.requiredWithKey("Raw Material", "title"),
  }),
  quantity: z
    .number({
      message: ValidationMessages.requiredWithKey("Raw Material", "quntity"),
    })
    .min(1, {
      message: ValidationMessages.cannotBeNegative("Raw Material", "quntity"),
    }),
  suppliers: z.array(z.string()).min(1, {
    message: ValidationMessages.leastOneSelection("supplier"),
  }),
});

export default RawMaterialsValidate;
