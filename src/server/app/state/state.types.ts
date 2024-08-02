

export interface State {
  _id: string;
  name: string;
  files: string;
  createdAt: string;
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
