import { Message } from "../Types/Message";

export const MessageComponent = ({ messageItem }: { messageItem: Message }) => {
  return (
    <div className="message-wrapper" style={{ display: "flex" }}>
      <img src={messageItem.from.avatar} alt="" />
      <div style={{ alignContent: "center" }}>
        <h4>{messageItem.from.name}</h4>
        <p style={{ fontSize: "10px" }}>{messageItem.date}</p>
        <p>{messageItem.content}</p>
      </div>
    </div>
  );
};
