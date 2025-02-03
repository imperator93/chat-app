import { User } from "../Types/User";
import { UserComponent } from "./UserComponent";

export const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div
      className="users-container"
      style={{
        userSelect: "none",
        display: "inline-flex",
        flexDirection: "column",
        gap: "2px",
        width: "200px",
        height: "100vh",
        borderRight: "2px solid black",
      }}
    >
      <strong>ONLINE</strong>
      {users
        .filter((user) => user.isOnline)
        .map((user) => (
          <UserComponent user={user} key={user.userId} />
        ))}
      <strong>OFFLINE</strong>
      {users
        .filter((user) => !user.isOnline)
        .map((user) => (
          <UserComponent user={user} key={user.userId} />
        ))}
    </div>
  );
};
