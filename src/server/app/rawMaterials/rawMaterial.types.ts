import { Status } from "@/lib/types/models";

export interface RawMaterial {
  _id: string;
  rid: string;
  title: string;
  quantity: number;
  availbleQuantity: number;
  usedQuantity: number;
  suppliers: string[];
  createdAt: string;
  status: Status;
}

export enum RawMaterialColumnEnum {
  serialNumber = "serialNumber",
  title = "title",
  suppliers = "suppliers",
  quantity = "quantity",
  availbleQuantity = "availbleQuantity",
  usedQuantity = "usedQuantity",
  averageQuantity = "averageQuantity",
  averageUsedQuantity = "averageUsedQuantity",
  createdAt = "createdAt",
  status = "status",
}

export interface RawMaterialsCreateDto {
  title: string;
  quantity: number;
  suppliers: string[];
}
