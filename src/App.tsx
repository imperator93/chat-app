import { useState } from "react";

import { User } from "./Types/User";
import { UsersList } from "./Components/UsersList";
import { ChatWindow } from "./Components/ChatWindow";
import { LoginComponent } from "./Components/LoginComponent";

import { testUsers } from "./TEST-INPUTS/UserInputs";

import "./style.css";
export const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleSignInSubmit = (event: React.FormEvent) => {
    console.log(event);
  };

  fetch("http://localhost:3000/chatApp/users", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      name: "Leo",
      age: 32,
    }),
  })
    .then((res) => res.json())
    .then((data) => console.log(data));
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
