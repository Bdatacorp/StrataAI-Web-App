"use server";

import rawMaterialController from "@/server/app/rawMaterials/rawMaterial.controller";

export async function deleteRawMaterialAction(id: string) {
  const deleted = await rawMaterialController.deleteRawMaterials(id);
  return deleted;
}
