import { SetStateAction } from "react";

import { User } from "../Types/User";
import { GetUserType } from "../Types/GetUserType";

import { CON_STRING } from "../CONSTANTS/CONNECTION_STRING";
import {
  DatabaseResponseUser,
  DatabaseResponseUsers,
} from "../Types/DatabaseResponse";
import { UserValidation } from "../Types/UserValidation";

//GET USERS
export const getUsers = async (
  setUsers: React.Dispatch<SetStateAction<User[]>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/users`);
  const usersFromApi: DatabaseResponseUsers = await response.json();
  setUsers(usersFromApi.data);
};

//GET USER
export const getUser = async (
  user: GetUserType,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const userFromApi: DatabaseResponseUser = await response.json();
  if (!userFromApi.success) {
    console.log(userFromApi.reason);
  } else setCurrentUser(userFromApi.data);
};

//POST USER
export const createUser = async (
  user: Omit<User, "userId">,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  setUserValidate: React.Dispatch<SetStateAction<UserValidation>>
) => {
  try {
    const response: Response = await fetch(
      `${CON_STRING}/chatApp/user/register`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (response.ok) {
      const dbResponse: DatabaseResponseUser = await response.json();
      if (!dbResponse.success) {
        setUserValidate((prev) => ({
          ...prev,
          nameMessage: dbResponse.reason,
          invalidName: true,
        }));
      } else setCurrentUser(dbResponse.data);
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
