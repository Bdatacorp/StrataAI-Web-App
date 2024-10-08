import { z } from "zod";
import ValidationMessages from "@/utils/server/config/validationMessages";

const FilesValidate = z.object({
  file: z.string().min(1, {
    message: ValidationMessages.requiredWithKey("State", "name"),
  }),
});

export default FilesValidate;
