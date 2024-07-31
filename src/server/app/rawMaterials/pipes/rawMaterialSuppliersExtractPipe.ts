export default function rawMaterialSuppliersExtractPipe(materials: any[]) {
 if (!materials) return materials;

  const data = materials.map((material: any) => {
    const supplierNames = material.suppliers
      .map((supplier: any) => supplier.name)
      .join(",");

    return {
      ...material,
      suppliers: supplierNames,
    };
  });

  return data;
}
