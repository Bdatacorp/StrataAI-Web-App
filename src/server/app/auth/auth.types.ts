export interface LoginDto {
  email: string;
  password: string;
}

export enum UserRoles {
  ADMIN = "Admin",
  USER = "User",
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum UserType {
  MANAGER = "Manager",
  OWNER = "Owner",
  ADMIN = "Admin",
}

export type UserPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRoles;
  type: UserType;
  phone: string;
  token: string;
  sessionToken?: string;
};

export interface CreateUserDto {
  name: string;
  email: string;
  type: string;
  phone: string;
  stateId: string;
}