import { User } from "./User";

export type UserResponse = Omit<User, "password">;
