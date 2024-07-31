import { z } from "zod";
import ValidationMessages from "../utils/config/validationMessages";

const ProductsValidate = z.object({
  title: z.string().min(1, {
    message: ValidationMessages.requiredWithKey("Product", "title"),
  }),
  description: z.string().min(1, {
    message: ValidationMessages.requiredWithKey("Product", "description"),
  }),
  quantity: z
    .number({
      message: ValidationMessages.requiredWithKey("Product", "quntity"),
    })
    .positive({
      message: ValidationMessages.cannotBeNegative("Product", "quntity"),
    })
    .min(1, {
      message: ValidationMessages.cannotBeNegative("Product", "quntity"),
    }),
  raw_materials: z.array(
    z.object({
      raw_material: z.string().min(1),
      quantity: z.number().positive(),
    })
  ),
});

export default ProductsValidate;
