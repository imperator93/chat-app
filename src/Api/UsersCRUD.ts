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
  try {
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
    }
  } catch (err: unknown) {
    console.error(err);
  }
};

export const putUser = async (
  user: User,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>
) => {
  try {
    const response = await fetch(`${CON_STRING}/chatApp/users`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const text = await response.text();
      console.log(text);
      const userFromServer: User = await response.json();
      setCurrentUser(userFromServer);
    }
  } catch (err: unknown) {
    console.log(err);
  }
};
