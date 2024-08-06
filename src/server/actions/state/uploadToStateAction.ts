"use server";
import statesController from "@/server/app/state/state.controller";

export default async function uploadToStateAction(formData: FormData) {
  const res: any = await statesController.uploadToState(formData);
  return res;
}
