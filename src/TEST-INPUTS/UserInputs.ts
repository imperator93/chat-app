import { User } from "../Types/User";

const leo: User = {
  userId: `${Math.random()}`,
  name: "Leo",
  avatar: "https://i.imgur.com/f5jpfxR.jpg",
  isAdmin: true,
  isOnline: false,
};

const asy: User = {
  userId: `${Math.random()}`,
  name: "Asy",
  avatar: "https://i.imgur.com/RPi2Du9.jpg",
  isAdmin: false,
  isOnline: false,
};

export const testUsers = [asy, leo];
