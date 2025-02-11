import { User } from "./User";

export type DatabaseResponseUser = {
  success: boolean;
  reason: string;
  data: User | undefined;
};

export type DatabaseResponseUsers = {
  success: boolean;
  reason: string;
  data: User[];
};
