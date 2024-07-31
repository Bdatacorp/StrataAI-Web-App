"use server";
import productsController from "@/server/app/products/products.controller";
import { StateFormState } from "@/components/modules/admin/state/types";
import { StateCreateDto } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";

export default async function createStateAction(
  prevState: StateFormState,
  formData: FormData
) {
  const name = formData.get("name") as string;

  const state: StateCreateDto = {
    name,
  };

  const res: any = await statesController.createState(state);

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
