import { SetStateAction } from "react";
import { User } from "../Types/User";
import { CON_STRING } from "../CONSTANTS/CONNECTION_STRING";

export const getUsers = async (
  setUsers: React.Dispatch<SetStateAction<User[]>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/users`);
  const user = await response.json();
  setUsers(user);
};

export const postUser = async (
  user: Omit<User, "userId">,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/users`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const userFromServer: User = await response.json();
    setCurrentUser(userFromServer);
    console.log(userFromServer);
  }
};

export const putUser = async (
  user: User,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/users`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const userFromServer: User = await response.json();
    setCurrentUser(userFromServer);
  }
};
