import { User } from "../Types/User";
import { UserComponent } from "./UserComponent";
import { UserLoadingComponent } from "./MinorComponents/UserLoadingComponent";

export const UsersList = ({
  users,
  handleUserClicked,
}: {
  users: User[];
  handleUserClicked: (event: React.BaseSyntheticEvent) => void;
}) => {
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
          .map((user) => (
            <UserComponent
              handleUserClicked={handleUserClicked}
              user={user}
              key={user.userId}
            />
          ))
      ) : (
        <UserLoadingComponent />
      )}
      <strong>OFFLINE</strong>
      {users.length > 0 ? (
        users
          .filter((user) => !user.isOnline)
          .map((user) => (
            <UserComponent
              handleUserClicked={handleUserClicked}
              user={user}
              key={user.userId}
            />
          ))
      ) : (
        <UserLoadingComponent />
      )}
    </div>
  );
};
