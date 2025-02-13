import { SetStateAction } from "react";

import { User } from "../Types/User";
import { GetUserType } from "../Types/GetUserType";
import { UserValidation } from "../Types/UserValidation";
import { DatabaseResponse } from "../Types/DatabaseResponse";

import { CON_STRING } from "../CONSTANTS/CONNECTION_STRING";

//GET USERS
export const getUsers = async (
  setUsers: React.Dispatch<SetStateAction<User[]>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/users`);
  const usersFromApi: DatabaseResponse<User[]> = await response.json();
  setUsers(usersFromApi.data);
};

//GET USER
export const getUser = async (
  user: GetUserType,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  setUserValidated: React.Dispatch<SetStateAction<UserValidation>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    const dbResponse: DatabaseResponse<User> = await response.json();
    if (!dbResponse.success) {
      setUserValidated((prev) => {
        return dbResponse.reason == " Username doesn't exist!"
          ? { ...prev, invalidName: true, nameMessage: dbResponse.reason }
          : { ...prev, invalidPass: true, passMessage: dbResponse.reason };
      });
    } else {
      setCurrentUser(dbResponse.data);
    }
  }
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
      const dbResponse: DatabaseResponse<User> = await response.json();
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
    const response = await fetch(`${CON_STRING}/chatApp/user/update`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (response.ok) {
      const dbResponse: DatabaseResponse<User> = await response.json();
      if (!dbResponse.success) console.log(dbResponse.reason);
      else setCurrentUser(dbResponse.data);
    }
  } catch (err: unknown) {
    console.log(err);
  }
};
