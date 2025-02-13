import { User } from "../Types/User";
import { UserComponent } from "./UserComponent";
import { LoadingComponent } from "./MinorComponents/LoadingComponent";

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
      {users.length > 0 ? (
        users
          .filter((user) => user.isOnline)
          .map((user) => <UserComponent user={user} key={user.userId} />)
      ) : (
        <LoadingComponent loadingType="Fetching users..." />
      )}
      <strong>OFFLINE</strong>
      {users.length > 0 ? (
        users
          .filter((user) => !user.isOnline)
          .map((user) => <UserComponent user={user} key={user.userId} />)
      ) : (
        <LoadingComponent loadingType="Fetching users..." />
      )}
    </div>
  );
};
