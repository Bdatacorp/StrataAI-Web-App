import { z } from "zod";

import ValidationMessages from "@/utils/server/config/validationMessages";
import { FeedbackType } from "./feedback.types";

export const FeedbackValidate = z.object({
  messageId: z.string().min(1, {
    message: ValidationMessages.requiredWithFelid("Message Id"),
  }),
  type: z.enum([FeedbackType.Bad, FeedbackType.Good], {
    message: ValidationMessages.requiredWithFelid("Type"),
  }),
});

export default FeedbackValidate;
