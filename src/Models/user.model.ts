import { Message } from "./message.model";

export class User {
  username: string;
  password: string;
  userId: string;
  userMessages: Message[];
  isSignedIn: boolean;
  isRegistered: boolean;

  //constructor function so it doesn't cry about it
  constructor(
    username: string,
    password: string,
    id: string,
    userMessages: Message[],
    isSignedIn: boolean,
    isRegistered: boolean
  ) {
    this.username = username;
    this.password = password;
    this.userId = id;
    this.userMessages = userMessages;
    this.isSignedIn = isSignedIn;
    this.isRegistered = isRegistered;
  }
}
