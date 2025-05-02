import { SetStateAction } from "react";
import { UserErrors } from "../Types/UserErrors";
import { User } from "../Types/User";
import { GetUserType } from "../Types/GetUserType";

import { CON_STRING } from "../CONSTANTS/CONNECTION_STRING";

//GET USERS
export const getUsers = async (
  setUsers: React.Dispatch<SetStateAction<User[]>>
) => {
  const response = await fetch(`${CON_STRING}/users`);
  const usersFromApi: User[] = await response.json();
  setUsers(usersFromApi);
};

//GET USER
export const getUser = async (
  user: GetUserType,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  setUserErrors: React.Dispatch<SetStateAction<UserErrors[]>>
) => {
  try {
    const response = await fetch(`${CON_STRING}/user/login`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) setUserErrors(await response.json());
    setCurrentUser(await response.json());
  } catch (err: unknown) {
    console.log(err);
  }
};

//POST USER
export const createUser = async (
  user: Omit<User, "userId">,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  setUserErrors: React.Dispatch<SetStateAction<UserErrors[]>>
) => {
  const response: Response = await fetch(`${CON_STRING}/user/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const errors: UserErrors[] = await response.json();
    setUserErrors(errors);
  } else setCurrentUser(await response.json());
};
