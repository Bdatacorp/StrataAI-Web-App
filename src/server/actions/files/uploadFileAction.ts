"use server";
import filesController from "@/server/app/files/files.controller";

export default async function uploadFileAction(
  formData: FormData,
) {
  const res: any = await filesController.upload(formData);
  return res;
}
