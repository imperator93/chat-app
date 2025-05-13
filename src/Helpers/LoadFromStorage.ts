import { SetStateAction } from "react";
import { User } from "../Types/User";

export const loadFromStorage = (
  setUser: React.Dispatch<SetStateAction<User | undefined>>,
  setToken: React.Dispatch<SetStateAction<string>>
) => {
  const userString = sessionStorage.getItem("user");
  if (userString != "undefined" && userString != null) {
    const user: User = JSON.parse(userString);
    setUser(user);
  }
  const tokenString = sessionStorage.getItem("token");
  if (tokenString != "undefined" && tokenString != null) {
    setToken(tokenString);
  }
};
