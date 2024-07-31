import { Status } from "../types/app";

export interface Product {
  _id: string;
  model_number: string;
  serial_number: string;
  title: string;
  description: string;
  quantity: number;
  usedQuantity: number;
  averageQuantity: number;
  averageUsedQuantity: number;
  assigned_materials: string;
  createdAt: string;
  status: Status;
}

export enum ProductColumnEnum {
  model_number = "model_number",
  serial_number = "serial_number",
  title = "title",
  description = "description",
  quantity = "quantity",
  averageQuantity = "averageQuantity",
  averageUsedQuantity = "averageUsedQuantity",
  usedQuantity = "usedQuantity",
  assigned_materials = "assigned_materials",
  createdAt = "createdAt",
  status = "status",
}

export interface ProductCreateDto {
  title: string;
  description: string;
  quantity: number;
  raw_materials: { raw_material: string; quantity: number }[];
}
