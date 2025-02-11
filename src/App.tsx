import { useEffect, useState } from "react";

import { UsersList } from "./Components/UsersList";
import { ChatWindow } from "./Components/ChatWindow";

import { User } from "./Types/User";
import { Message } from "./Types/Message";
import { SignInComponent } from "./Components/SignInComponent";
import { LoginComponent } from "./Components/LoginComponent";

//CRUD
import { getUser, getUsers, createUser, putUser } from "./Api/UsersCRUD";

//CRUD TYPES
import { GetUserType } from "./Types/GetUserType";

import "./style.css";
import { UserValidation } from "./Types/UserValidation";
export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [userValidated, setUserValidated] = useState<UserValidation>({
    invalidName: false,
    invalidPass: false,
    nameMessage: "",
    passMessage: "",
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const user = sessionStorage.getItem("user");

    if (user) setCurrentUser(JSON.parse(user));

    if (currentUser?.isOnline) {
      const i = setInterval(() => {
        getUsers(setUsers);
        return () => clearInterval(i);
      }, 1000);
    }
  }, [currentUser?.isOnline]);

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
    createUser(userToPost, setCurrentUser, setUserValidated);
  };
  console.log(userValidated);
  //HANDLE LOG IN SUBMIT
  const handleLogInSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const username = ((event.target as HTMLFormElement)[0] as HTMLInputElement)
      .value;

    const password = ((event.target as HTMLFormElement)[1] as HTMLInputElement)
      .value;

    const user: GetUserType = {
      name: username,
      password: password,
    };

    getUser(user, setCurrentUser);
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
          <>
            {!login ? (
              <SignInComponent
                userValidated={userValidated}
                handleSignInSubmit={handleSignInSubmit}
                setLogin={setLogin}
              />
            ) : (
              <LoginComponent
                userValidated={userValidated}
                handleLogInSubmit={handleLogInSubmit}
                setLogin={setLogin}
              />
            )}
          </>
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
