export default function parseAvaragePipe(obj: any) {
  if (!obj) return obj;

  const updated = obj.map((rowData: any) => {
    //check if need data avaible

    return {
      ...rowData,
      averageQuantity: getAverage(rowData.quantity, rowData.availbleQuantity),
      averageUsedQuantity: getAverage(rowData.quantity, rowData.usedQuantity),
    };
  });

  return updated;
}

function getAverage(qty: string, available: string) {
  let numberQty = parseInt(qty);
  let numberAvailable = parseInt(available);
  let avarage = (numberAvailable / numberQty) * 100;

  return avarage;
}
