"use server";
import { RawMaterialsCreateDto } from "@/server/app/rawMaterials/rawMaterial.types";
import rawMaterialController from "@/server/app/rawMaterials/rawMaterial.controller";

import stringToArrayConverterPipe from "@/utils/pipes/stringToArrayConverterPipe";
import { RawMaterialFormState } from "@/components/modules/rawMaterials/types";

export default async function createRawMaterialAction(
  prevState: RawMaterialFormState,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const quantity = formData.get("quantity") as string;
  const suppliers = formData.get("suppliers") as string;

  const rawMaterial: RawMaterialsCreateDto = {
    title: title,
    quantity: parseInt(quantity),
    suppliers: stringToArrayConverterPipe(suppliers),
  };

  const res: any = await rawMaterialController.createRawMaterials(rawMaterial);

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
