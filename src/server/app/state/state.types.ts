import { Status } from "../types/app";

export interface State {
  _id: string;
  name: string;
  files: string;
  createdAt: string;
  status: Status;
}

export enum StateColumnEnum {
  name = "name",
  files = "files",
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  status = "status",
}

export interface StateCreateDto {
  name: string;
}
