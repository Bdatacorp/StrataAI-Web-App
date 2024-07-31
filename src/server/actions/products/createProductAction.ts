"use server";
import { RawMaterialsCreateDto } from "@/server/app/rawMaterials/rawMaterial.types";
import rawMaterialController from "@/server/app/rawMaterials/rawMaterial.controller";

import stringToArrayConverterPipe from "@/utils/pipes/stringToArrayConverterPipe";
import { ProductFormState } from "@/components/modules/products/types";
import { ProductCreateDto } from "@/server/app/products/products.types";
import productsController from "@/server/app/products/products.controller";

export default async function createProductAction(
  prevState: ProductFormState,
  data: ProductFormState
) {

  const formData = data.formData;
  if (!formData) return prevState;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const quantity = formData.get("quantity") as string;

  const products: ProductCreateDto = {
    title,
    quantity: parseInt(quantity),
    description,
    raw_materials: data.raw_materials,
  };

  console.log("quantity",quantity);
  

  const res: any = await productsController.createProduct(products);

  if (res?.errors) {
    return {
      ...prevState,
      errors: res?.errors,
    };
  }

  return {
    ...prevState,
    status: res.status,
    message: res.message,
  };
}
