"use server";
import filesController from "@/server/app/files/files.controller";

export default async function uploadToStateAction(formData: FormData) {
  const res: any = await filesController.uploadToState(formData);
  return res;
}
