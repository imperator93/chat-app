import { SetStateAction } from "react";
import { UserErrors } from "../Types/UserErrors";
import { User } from "../Types/User";
import { GetUserType } from "../Types/GetUserType";

import { CON_STRING } from "../CONSTANTS/CONNECTION_STRING";

//GET USERS
export const getUsers = async (
  setUsers: React.Dispatch<SetStateAction<User[]>>,
  token: string
) => {
  const response = await fetch(`${CON_STRING}/users`, {
    method: "GET",
    headers: {
      "content-type": "applicatio/json",
      authorization: `Bearer ${token}`,
    },
  });
  const usersFromApi: User[] = await response.json();
  setUsers(usersFromApi);
};

//GET USER
export const getUser = async (
  user: GetUserType,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  setUserErrors: React.Dispatch<SetStateAction<UserErrors[]>>,
  setToken: React.Dispatch<SetStateAction<string>>
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
  else {
    setToken(data.token);
    setCurrentUser(data.userResponse);
  }
};

//POST USER
export const createUser = async (
  user: Omit<User, "userId">,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  setUserErrors: React.Dispatch<SetStateAction<UserErrors[]>>,
  setToken: React.Dispatch<SetStateAction<string>>
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
  else {
    setToken(data.token);
    setCurrentUser(data.userResponse);
  }
};

//PUT USER
export const putUser = async (
  user: User,
  setUserErrors: React.Dispatch<SetStateAction<UserErrors[]>>,
  setCurrentUser: React.Dispatch<SetStateAction<User | undefined>>,
  token: string
) => {
  const response = await fetch(`${CON_STRING}/user`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();

  if (!response.ok) setUserErrors(data);
  else setCurrentUser(data);
};
