import { useEffect, useState } from "react";

import { UsersList } from "./Components/UsersList";
import { ChatWindow } from "./Components/ChatWindow";
import { LoginComponent } from "./Components/LoginComponent";

import { User } from "./Types/User";
import { Message } from "./Types/Message";

//CRUD
import { getUsers, postUser } from "./Api/UsersCRUD";

import "./style.css";
//TEST INPUTS
export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>();
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) setCurrentUser(JSON.parse(user));

    const i = setInterval(() => {
      getUsers(setUsers);
      return () => clearInterval(i);
    }, 1000);
  }, []);

  useEffect(() => {
    if (currentUser != undefined)
      sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  //HANDLE SIGN IN
  const handleSignInSubmit = (
    event: React.FormEvent,
    avatarSelected: string
  ) => {
    event.preventDefault();

    const userInput = ((event.target as HTMLFormElement)[0] as HTMLInputElement)
      .value;
    postUser(
      {
        avatar: avatarSelected,
        isAdmin: false,
        isOnline: true,
        name: userInput,
      },
      setCurrentUser
    );
  };

  const handleUserClicked = (event: React.BaseSyntheticEvent) => {};
  return (
    <main>
      <div
        className="main-container"
        style={{
          height: "100vh",
          marginLeft: "10vw",
          marginRight: "10vw",
          background: "lightBlue",
          display: "flex",
        }}
      >
        {!currentUser?.isOnline ? (
          <LoginComponent handleSignInSubmit={handleSignInSubmit} />
        ) : (
          <>
            <UsersList handleUserClicked={handleUserClicked} users={users} />
            <ChatWindow messages={messages} />
          </>
        )}
      </div>
    </main>
  );
};
