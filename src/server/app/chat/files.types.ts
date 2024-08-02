export interface File {
  id: string;
  file_id: string;
  filename: string;
  location: string;
  createdAt: string;
}

export enum FileColumnEnum {
  file_id = "file_id",
  filename = "filename",
  location = "location",
  createdAt = "createdAt",
}