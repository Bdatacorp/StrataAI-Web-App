"use server";
import filesController from "@/server/app/files/files.controller";

export default async function deleteFileAction(id: string) {
  const res: any = await filesController.deleteFile(id);
  return res;
}
