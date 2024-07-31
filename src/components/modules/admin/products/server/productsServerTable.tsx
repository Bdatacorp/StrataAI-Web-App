import { TableColumns, TableRows } from "@/components/ui/client/table/types";
import { Suspense } from "react";
import DataTableLoading from "@/components/ui/client/table/loading";
import { RawMaterialColumnEnum } from "@/server/app/rawMaterials/rawMaterial.types";
import ProductsClientTable from "../client/productsClientTable";
import productsController from "@/server/app/products/products.controller";
import { ProductColumnEnum } from "@/server/app/products/products.types";

interface columns extends TableColumns {
  dataColumn: RawMaterialColumnEnum | string;
}

const cloumns: columns[] = [
  {
    label: "Model Number",
    dataColumn: ProductColumnEnum.model_number,
    maxWidth: 80,
  },
  {
    label: "Serial Number",
    dataColumn: ProductColumnEnum.serial_number,
    maxWidth: 80,
  },
  {
    label: "Title",
    dataColumn: ProductColumnEnum.title,
    maxWidth: 80,
  },
  {
    label: "Description",
    dataColumn: ProductColumnEnum.description,
    maxWidth: 80,
  },
  {
    label: "Stock",
    dataColumn: ProductColumnEnum.averageQuantity,
    maxWidth: 80,
  },
  {
    label: "Create at",
    dataColumn: ProductColumnEnum.createdAt,
    maxWidth: 80,
  },
  {
    label: "Status",
    dataColumn: ProductColumnEnum.status,
    center: true,
  },
];

async function FetchTable() {
  const data = await productsController.getAllProducts();

  //4s

  const rawMaterialsRows: TableRows = {
    data,
  };

  return <ProductsClientTable columns={cloumns} rows={rawMaterialsRows} />;
}

const ProductServerTable = () => {
  return (
    <>
      <Suspense fallback={<DataTableLoading columns={cloumns} />}>
        <FetchTable />
      </Suspense>
    </>
  );
};

export default ProductServerTable;
