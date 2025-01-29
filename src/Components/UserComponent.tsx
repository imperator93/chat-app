import { User } from "../Types/User";

export const UserComponent = ({ user }: { user: User }) => {
  return (
    <div
      className="user-container"
      style={{ display: "flex", width: "100%", height: "200px" }}
    >
      <img src={user.avatar} style={{ height: "50px", width: "50px" }} />
      <h3>{user.name}</h3>
    </div>
  );
};
