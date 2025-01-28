import { User } from "../Types/User";

export const UsersList = ({ users }: { users: User[] }) => {
  return (
    <div
      className="users-container"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        gap: "2px",
        width: "200px",
        height: "100vh",
        borderRight: "2px solid black",
      }}
    >
      {users.map((user) => (
        <div key={user.userId} style={{ display: "flex", gap: "5px" }}>
          <img
            style={{ display: "inline", width: "50px", height: "50px" }}
            src={user.avatar}
          ></img>
          <p style={{ alignContent: "center" }}>{user.name}</p>
        </div>
      ))}
    </div>
  );
};
