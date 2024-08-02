"use server";

import { StateCreateDto } from "@/server/app/state/state.types";
import statesController from "@/server/app/state/state.controller";

export default async function createStateAction(name: string) {
  const state: StateCreateDto = {
    name,
  };

  const res: any = await statesController.createState(state);
  return res;
}
