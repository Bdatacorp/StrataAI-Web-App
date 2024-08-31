"use server";

import { StateCreateDto } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";

export default async function revalidateStateAction(stateId: string) {
  return await statesController.revalidateState(stateId);
}
