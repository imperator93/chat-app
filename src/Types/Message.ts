export type Message = {
  id: string;
  content: string;
  fromId: string;
  toGroupId: string[];
  date: Date;
};
