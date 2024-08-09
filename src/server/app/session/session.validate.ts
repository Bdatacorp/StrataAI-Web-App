import { z } from "zod";

export const InitSessionValidate = z.object({
  stateId: z
    .string({
      message: "Please select a one of state",
    })
    .min(1, {
      message: "Please select a one of state",
    }),
});
