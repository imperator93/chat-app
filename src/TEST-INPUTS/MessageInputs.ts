import { v4 } from "uuid";
import { testUsers } from "./UserInputs";
import { Message } from "../Types/Message";

export const messageArr: Message[] = [];

for (let i = 0; i < 30; i++)
  messageArr.push({
    id: v4(),
    content: `${i}`,
    date: `${new Date(Date.now())}`.slice(0, 25),
    from: testUsers[0],
  });
