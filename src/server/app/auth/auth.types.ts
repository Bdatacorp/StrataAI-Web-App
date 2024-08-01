export interface LoginDto {
  email: string;
  password: string;
}

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum UserType {
  MANAGER = 'manager',
  OWNER = 'owner',
  ADMIN = 'admin',
}

export type UserPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  type: UserType;
  phone: string;
  token: string;
};
