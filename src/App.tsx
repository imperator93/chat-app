import { useEffect, useState } from "react";

//COMPONENTS
import { ChatWindow } from "./Components/ChatWindow";
import { UsersList } from "./Components/UsersList";

//TYPES
import { User } from "./Types/User";
import { Message } from "./Types/Message";
import { SignInComponent } from "./Components/SignInComponent";
import { LoginComponent } from "./Components/LoginComponent";
import { UserValidation } from "./Types/UserValidation";

//CRUD
import { getUser, getUsers, createUser, putUser } from "./Api/UsersCRUD";

//CRUD TYPES
import { GetUserType } from "./Types/GetUserType";

//HELPERS
import { getFormInfo } from "./Helpers/GetFormInfo";

//CONSTANTS
import { initUserValidated } from "./CONSTANTS/BASE_CASES";

//STYLE
import "./style.css";

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [userValidated, setUserValidated] =
    useState<UserValidation>(initUserValidated);
  const [userWasClickedOn, setUserWasClickedOn] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [login, setLogin] = useState(false);

  window.addEventListener("beforeunload", () => {
    if (currentUser) {
      const user: User = { ...currentUser!, isOnline: false };
      putUser(user, setCurrentUser);
    }
  });

  useEffect(() => {
    if (currentUser?.isOnline) {
      const i = setInterval(() => {
        getUsers(setUsers);
        return () => clearInterval(i);
      }, 1000);
    }
  }, [currentUser?.isOnline]);

  //HANDLE SIGN IN
  const handleSignInSubmit = (
    event: React.FormEvent,
    avatarSelected: string
  ) => {
    const data = getFormInfo(event);

    const userToPost: Omit<User, "userId"> = {
      avatar: avatarSelected,
      isAdmin: false,
      isOnline: true,
      ...data,
    };
    createUser(userToPost, setCurrentUser, setUserValidated);
  };

  //HANDLE LOG IN
  const handleLogInSubmit = (event: React.FormEvent) => {
    const data = getFormInfo(event);

    const user: GetUserType = data;

    getUser(user, setCurrentUser, setUserValidated);
  };

  // HANDLE LOG OUT
  const handleLogOut = () => {
    const user: User = { ...currentUser!, isOnline: false };
    putUser(user, setCurrentUser);
  };

  const handleLogToSignSwitch = () => {
    setLogin((prev) => !prev);
    setUserValidated(initUserValidated);
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
                handleLogToSignSwitch={handleLogToSignSwitch}
              />
            ) : (
              <LoginComponent
                userValidated={userValidated}
                handleLogInSubmit={handleLogInSubmit}
                handleLogToSignSwitch={handleLogToSignSwitch}
              />
            )}
          </>
        ) : (
          <>
            <UsersList handleUserClicked={handleUserClicked} users={users} />
            <ChatWindow
              users={users}
              userWasClickedOn={userWasClickedOn}
              handleLogOut={handleLogOut}
              messages={messages}
            />
          </>
        )}
      </div>
    </main>
  );
};
