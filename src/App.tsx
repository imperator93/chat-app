import { useEffect, useState } from "react";

//COMPONENTS
import { ChatWindow } from "./Components/ChatWindow";
import { UsersList } from "./Components/UsersList";

//TYPES
import { User } from "./Types/User";
import { Message } from "./Types/Message";
import { SignInComponent } from "./Components/SignInComponent";
import { LoginComponent } from "./Components/LoginComponent";

//CRUD
import { getUser, getUsers, createUser, putUser } from "./Api/UsersCRUD";

//CRUD TYPES
import { GetUserType } from "./Types/GetUserType";
import { UserErrors } from "./Types/UserErrors";

//HELPERS
import { getFormInfo } from "./Helpers/GetFormInfo";

//STYLE
import "./style.css";

export const App = () => {
  const [login, setLogin] = useState(false);
  const [token, setToken] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [userErrors, setUserErrors] = useState<UserErrors[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);

  //NEED FIX TO LOGOUT USER ON SESSION UNLOAD OR REFRESH

  useEffect(() => {
    if (currentUser?.isOnline) getUsers(setUsers, token);
  }, [currentUser?.isOnline, token]);

  useEffect(() => {
    const jwt = localStorage.getItem("Jwt");
    if (jwt != null) {
      setToken(JSON.parse(jwt));
    }
    return;
  }, [token]);

  //HANDLE SIGN IN
  const handleSignInSubmit = async (
    event: React.FormEvent,
    avatarSelected: string
  ) => {
    const data = getFormInfo(event);

    const userToPost: Omit<User, "userId"> = {
      avatar: avatarSelected,
      isOnline: true,
      ...data,
    };
    await createUser(userToPost, setCurrentUser, setUserErrors, setToken);
    localStorage.setItem("Jwt", token);
    console.log(localStorage);
  };

  //HANDLE LOG IN
  const handleLogInSubmit = (event: React.FormEvent) => {
    const data = getFormInfo(event);

    const user: GetUserType = data;

    getUser(user, setCurrentUser, setUserErrors);
  };

  // HANDLE LOG OUT
  const handleLogOut = () => {
    const user: User = { ...currentUser!, isOnline: false };
    putUser(user, setUserErrors, setCurrentUser, token);
  };

  // HANDLE SING IN LOG IN FORMS SWITCH
  const handleLogToSignSwitch = () => {
    setLogin((prev) => !prev);
    setUserErrors([]);
  };

  //////////////////
  /* MESSAGES */
  //////////////////

  // HANDLE SEND MESSAGE
  const handleSendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    const messageInput = (
      (event.target as HTMLFormElement)[0] as HTMLInputElement
    ).value;

    const message: Omit<Message, "messageId" | "date"> = {
      content: messageInput,
      userId: currentUser!.userId,
    };
  };
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
                userErrors={userErrors}
                handleSignInSubmit={handleSignInSubmit}
                handleLogToSignSwitch={handleLogToSignSwitch}
              />
            ) : (
              <LoginComponent
                userErrors={userErrors}
                handleLogInSubmit={handleLogInSubmit}
                handleLogToSignSwitch={handleLogToSignSwitch}
              />
            )}
          </>
        ) : (
          <>
            <UsersList users={users} />
            <ChatWindow
              users={users}
              messages={messages}
              handleSendMessage={handleSendMessage}
              handleLogOut={handleLogOut}
            />
          </>
        )}
      </div>
    </main>
  );
};
