"use server";

import productsController from "@/server/app/products/products.controller";

export async function deleteProductAction(id: string) {
  const deleted = await productsController.deleteProduct(id);
  return deleted;
}
