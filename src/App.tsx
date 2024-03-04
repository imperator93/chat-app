import { useEffect, useState } from "react";

import { User } from "./Models/user.model";
import { Message } from "./Models/message.model";
import { ChatComponent } from "./Components/ChatComponent";
import { Login } from "./Components/LoginComponent";

import "./App.css";
import { saveToLocalStorage } from "./helpers/saveToLocalStorage";
import { idGenerator } from "./helpers/idGenerator";

export function App() {
  const currentUserInitState = {
    username: "",
    password: "",
    userId: "",
    userMessages: [],
    isSignedIn: false,
    isRegistered: false,
  };

  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(currentUserInitState);

  console.log(localStorage);

  // REGISTER
  useEffect(() => {
    //set register
    if (registeredUsers.length < 2 && currentUser.isRegistered) {
      const newRegisteredUsers: User[] = registeredUsers;
      newRegisteredUsers.push(currentUser);

      setRegisteredUsers(newRegisteredUsers);
      setCurrentUser(currentUserInitState);

      saveToLocalStorage("registered-users", registeredUsers);
    }
  }, [currentUser.isRegistered]);

  useEffect(() => {
    //load register
    const getStorageUsers = localStorage.getItem("registered-users");
    if (getStorageUsers) {
      const storageUsers = JSON.parse(getStorageUsers);
      setRegisteredUsers(storageUsers);
    }
  }, []);

  //LOGIN
  const onLogin = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    registeredUsers.forEach((user, index) => {
      if (user.username === event.target[0].value && user.password === event.target[2].value) {
        user.isSignedIn = true;
        registeredUsers[index] = user;
        setRegisteredUsers([...registeredUsers]);
        setCurrentUser({ ...user });

        saveToLocalStorage("registered-users", registeredUsers);
      }
    });
  };

  //load signed in user
  useEffect(() => {
    registeredUsers.forEach((user) => {
      if (user.isSignedIn === true) {
        setCurrentUser(user);
      }
    });
  }, [registeredUsers]);

  //sign out
  const signOutHandler = () => {
    setCurrentUser({ ...currentUser, isSignedIn: false });
    registeredUsers.forEach((user, index) => {
      if (user.userId === currentUser.userId) {
        registeredUsers[index].isSignedIn = false;
        setRegisteredUsers([...registeredUsers]);

        saveToLocalStorage("registered-users", registeredUsers);
      }
    });
  };
  console.log(currentUser);
  console.log(registeredUsers);

  //////////////////////////////
  ////////// MESSAGES //////////
  //////////////////////////////

  const sendMessage = (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    if (event.target[0].value) {
      const message: Message = {
        message: event.target[0].value,
        id: idGenerator(),
      };
      currentUser.userMessages.push(message);
      setCurrentUser({ ...currentUser });
    }

    event.target[0].value = "";

    registeredUsers.forEach((user, index) => {
      if (user.userId === currentUser.userId) {
        registeredUsers[index] = currentUser;
        setRegisteredUsers([...registeredUsers]);

        saveToLocalStorage("registered-users", registeredUsers);
      }
    });
  };

  return (
    <>
      {(currentUser.isSignedIn && (
        <ChatComponent
          sendMessage={sendMessage}
          signOutHandler={signOutHandler}
          currentUser={currentUser}
          registeredUsers={registeredUsers}
        ></ChatComponent>
      )) || (
        <Login onLogin={onLogin} currentUser={currentUser} setCurrentUser={setCurrentUser}></Login>
      )}
    </>
  );
}

export default App;
