import { User } from "./User";

export type UserRequest = Omit<User, "userId" | "avatar">;
