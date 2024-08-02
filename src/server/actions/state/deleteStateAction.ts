"use server";
import productsController from "@/server/app/products/products.controller";
import { StateFormState } from "@/components/modules/admin/state/types";
import { StateCreateDto } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";

export default async function deleteStateAction(id: string) {
  const res: any = await statesController.deleteState(id);
  return res;
}
