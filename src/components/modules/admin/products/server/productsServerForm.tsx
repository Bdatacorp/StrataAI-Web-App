import rawMaterialController from "@/server/app/rawMaterials/rawMaterial.controller";
import { RawMaterial } from "@/server/app/rawMaterials/rawMaterial.types";
import supplierController from "@/server/app/suppliers/suppliers.controller";

import { Supplier } from "@/server/app/suppliers/suppliers.types";
import ProductClientForm from "../client/productsClientForm";

async function FetchOptions() {
  const data: RawMaterial[] = await rawMaterialController.getAllRawMaterials();

  const options = data
    ? data.map((materials: RawMaterial) => ({
        value: materials._id,
        label: materials.title,
      }))
    : [];

  return <ProductClientForm selectRawMaterialsOptions={options} />;
}

export default function ProductsServerForm() {
  return <FetchOptions />;
}
