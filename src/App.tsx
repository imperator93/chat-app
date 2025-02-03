import { useEffect, useState } from "react";

import { UsersList } from "./Components/UsersList";
import { ChatWindow } from "./Components/ChatWindow";
import { LoginComponent } from "./Components/LoginComponent";

import { User } from "./Types/User";
import { Message } from "./Types/Message";

import { v4 } from "uuid";

import "./style.css";
const CON_STRING = "http://localhost:3000";
//TEST INPUTS
import { messageArr } from "./TEST-INPUTS/MessageInputs";
export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>(messageArr);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const user = sessionStorage.getItem("user");
    if (user) setCurrentUser(JSON.parse(user));

    fetch(`${CON_STRING}/chatApp/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    if (currentUser != undefined)
      sessionStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  console.log(sessionStorage);

  const handleSignInSubmit = (
    event: React.FormEvent,
    avatarSelected: string
  ) => {
    const userInput = ((event.target as HTMLFormElement)[0] as HTMLInputElement)
      .value;

    event.preventDefault();
    setCurrentUser({
      avatar: avatarSelected,
      isAdmin: false,
      isOnline: true,
      name: userInput,
      userId: v4(),
    });
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
          <LoginComponent handleSignInSubmit={handleSignInSubmit} />
        ) : (
          <>
            <UsersList users={users} />
            <ChatWindow messages={messages} />
          </>
        )}
      </div>
    </main>
  );
};
