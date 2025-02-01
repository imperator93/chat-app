import { useEffect, useState } from "react";

import { User } from "./Types/User";
import { UsersList } from "./Components/UsersList";
import { ChatWindow } from "./Components/ChatWindow";
import { LoginComponent } from "./Components/LoginComponent";

import { v4 } from "uuid";

import "./style.css";

const CON_STRING = "http://localhost:3000";

export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${CON_STRING}/chatApp/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  console.log(users);
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
        {currentUser == null ? (
          <LoginComponent handleSignInSubmit={handleSignInSubmit} />
        ) : (
          <>
            <UsersList users={users} />
            <ChatWindow setUsers={setUsers} />
          </>
        )}
      </div>
    </main>
  );
};
