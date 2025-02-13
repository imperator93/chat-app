import { User } from "../Types/User";

export const UserComponent = ({ user }: { user: User }) => {
  return (
    <button
      id={user.userId}
      className="user-container"
      style={{
        cursor: "pointer",
        display: "flex",
        width: "100%",
        height: "fit-content",
        gap: "2px",
        border: "none",
        backgroundColor: "transparent",
        opacity: user.isOnline ? "100%" : "60%",
      }}
    >
      <img style={{ pointerEvents: "none" }} src={user.avatar} />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <h4 style={{ pointerEvents: "none" }}>{user.name}</h4>
        <p
          style={{
            color: user.isOnline ? "green" : "red",
            pointerEvents: "none",
          }}
        >
          {user.isOnline ? "online" : "offline"}
        </p>
      </div>
    </button>
  );
};
