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
  const response = await fetch(`${CON_STRING}/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (!response.ok) setUserErrors(data);
  else setCurrentUser(data);
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
  const data = await response.json();

  if (!response.ok) setUserErrors(data);
  else setCurrentUser(data);
};

//PUT USER
export const putUser = async (
  user: User,
  setUserErrors: React.Dispatch<SetStateAction<UserErrors[]>>,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>
) => {
  const response = await fetch(`${CON_STRING}/user`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (!response.ok) setUserErrors(data);
  else setCurrentUser(data);
};
