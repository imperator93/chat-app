import { User } from "../Types/User";

const leo: User = {
  userId: `${Math.random()}`,
  name: "Leo",
  avatar: "https://i.imgur.com/f5jpfxR.jpg",
  isAdmin: true,
  password: "12345",
  messages: [],
  isOnline: false,
  isCurrentUser: false,
};

const asy: User = {
  userId: `${Math.random()}`,
  name: "Asy",
  avatar: "https://i.imgur.com/RPi2Du9.jpg",
  isAdmin: false,
  password: "54321",
  messages: [],
  isOnline: false,
  isCurrentUser: false,
};

export const testUsers = [asy, leo];
