import { User } from "../Models/user.model";

export function MessageComponent(props: { currentUser: User; message: string; id: string }) {
  return (
    <>
      <p
        style={{
          margin: "0",
          fontSize: "12px",
          width: "fit-content",
          borderRadius: "4px",
        }}
      >
        {props.currentUser.username} says:
      </p>
      <p style={{ margin: "0" }}>{props.message}</p>
    </>
  );
}
