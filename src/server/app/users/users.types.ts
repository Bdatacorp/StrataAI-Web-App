import { UserRoles, UserType } from "../auth/auth.types";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  type: UserType;
  phone: string;
}

export enum UserColumnEnum {
  name = "name",
  email = "email",
  role = "role",
  type = "type",
  phone = "phone",
}