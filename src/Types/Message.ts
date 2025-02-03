import { User } from "./User";

export type Message = {
  id: string;
  content: string;
  from: User;
  date: string;
};
