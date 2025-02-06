import { Message } from "../models/Message.model.js";

const leo = {
  userId: `${Math.random()}`,
  name: "Leo",
  avatar: "https://i.imgur.com/f5jpfxR.jpg",
  isAdmin: true,
  isOnline: false,
};

const asy = {
  userId: `${Math.random()}`,
  name: "Asy",
  avatar: "https://i.imgur.com/RPi2Du9.jpg",
  isAdmin: false,
  isOnline: false,
};

console.log(new Message("test", asy, "1"))