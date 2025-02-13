import { Message } from "../Types/Message";
import { User } from "../Types/User";

export const MessageComponent = ({
  messageItem,
  users,
}: {
  users: User[];
  messageItem: Message;
}) => {
  const user = users.find((user) => user.userId == messageItem.userId);

  return (
    <div
      className="message-wrapper"
      style={{
        display: "flex",
        padding: "2px",
        margin: "2px",
        border: "1px solid gray",
        width: "calc(100% - 10px)",
      }}
    >
      <img src={user?.avatar} alt="" />
      <div
        style={{
          alignContent: "center",
        }}
      >
        <h4>{user?.name}</h4>
        <p style={{ fontSize: "10px" }}>{messageItem.date}</p>
        <p>{messageItem.content}</p>
      </div>
    </div>
  );
};
