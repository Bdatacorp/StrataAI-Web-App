export interface File {
  id: string;
  filename: string;
  location: string;
  createdAt: string;
}

export enum FileColumnEnum {
  filename = "filename",
  location = "location",
  createdAt = "createdAt",
}