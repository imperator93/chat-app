import { useEffect, useState } from "react";

import { UsersList } from "./Components/UsersList";
import { ChatWindow } from "./Components/ChatWindow";

import { User } from "./Types/User";
import { Message } from "./Types/Message";
import { SignInComponent } from "./Components/SIgnInComponent";
import { LoginComponent } from "./Components/LoginComponent";

//CRUD
import { getUsers, postUser, putUser } from "./Api/UsersCRUD";

import "./style.css";
export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [login, setLogin] = useState(false);

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

    const username = ((event.target as HTMLFormElement)[0] as HTMLInputElement)
      .value;

    const password = ((event.target as HTMLFormElement)[1] as HTMLInputElement)
      .value;
    const userToPost: Omit<User, "userId"> = {
      avatar: avatarSelected,
      isAdmin: false,
      isOnline: true,
      name: username,
      password: password,
    };
    postUser(userToPost, setCurrentUser);
  };

  const handleLogOut = () => {
    const user: User = { ...currentUser!, isOnline: false };
    putUser(user, setCurrentUser);
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
          <SignInComponent
            handleSignInSubmit={handleSignInSubmit}
            setLogin={setLogin}
          />
        ) : login ? (
          <LoginComponent />
        ) : (
          <>
            <UsersList handleUserClicked={handleUserClicked} users={users} />
            <ChatWindow handleLogOut={handleLogOut} messages={messages} />
          </>
        )}
      </div>
    </main>
  );
};
