import { Product } from "@/server/app/products/products.types";
import { Table, Checkbox } from "@mantine/core";

export default function GoodsIssuedNoteTable({
  products,
}: {
  products: any[];
}) {
  const rows = products.map(
    ({ product, quantity }: { product: Product; quantity: number }, index) => (
      <Table.Tr key={index}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{product.serial_number}</Table.Td>
        <Table.Td> {product.model_number}</Table.Td>
        <Table.Td> {product.title}</Table.Td>
        <Table.Td> {product.description}</Table.Td>
        <Table.Td> {quantity}</Table.Td>
      </Table.Tr>
    )
  );

  return (
    <div className="mt-7 table-container">
      <Table verticalSpacing="sm" withRowBorders={true}>
        <Table.Thead>
          <Table.Tr bg={"#F4F6F8"} className="text-[#5E7080]">
            <Table.Th>#</Table.Th>
            <Table.Th>Serial Number</Table.Th>
            <Table.Th>Model Number</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Quantity</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </div>
  );
}
