import { RawMaterial } from "../rawMaterial.types";

export default function rawMaterialsParseAvaragePipe(
  rawMaterial: RawMaterial[]
) {
  if (!rawMaterial) return rawMaterial;

  const updated = rawMaterial.map((rawMaterial: any) => ({
    ...rawMaterial,
    averageQuantity: getAverage(
      rawMaterial.quantity,
      rawMaterial.availbleQuantity
    ),
    averageUsedQuantity: getAverage(
      rawMaterial.quantity,
      rawMaterial.usedQuantity
    ),
  }));

  return updated;
}

function getAverage(qty: string, available: string) {
  let numberQty = parseInt(qty);
  let numberAvailable = parseInt(available);
  let avarage = (numberAvailable / numberQty) * 100;

  return avarage;
}
