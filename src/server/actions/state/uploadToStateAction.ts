"use server";
import productsController from "@/server/app/products/products.controller";
import { StateFormState } from "@/components/modules/admin/state/types";
import { StateCreateDto } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";

export default async function uploadToStateAction(
  formData: FormData,
) {
  console.log(formData.get("files"));

  const res: any = await statesController.uploadToState(formData);
  return res;
}
