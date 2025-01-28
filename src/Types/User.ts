export type User = {
  userId: string;
  name: string;
  password: string;
  avatar: string;
  isAdmin: boolean;
  messages: Message[];
  isOnline: boolean;
  isCurrentUser: boolean;
};

type Message = {
  content: string;
  dateTime: Date;
};
