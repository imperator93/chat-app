import { Message } from "../Types/Message";
import { MessageComponent } from "./MessageComponent";

export const ChatWindow = ({
  messages,
}: {
  messages: Message[] | undefined;
}) => {
  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <div
      className="chat-window-container"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: "2%",
          overflowY: "auto",
          width: "95%",
          height: "50%",
          background: "white",
        }}
      >
        {messages?.map((messageItem) => (
          <MessageComponent key={messageItem.id} messageItem={messageItem} />
        ))}
      </div>
      <form
        onSubmit={(event) => handleOnSubmit(event)}
        style={{ width: "90%", display: "flex", marginTop: "5px" }}
      >
        <input
          type="text"
          style={{ flexGrow: "10", height: "30px", fontSize: "30px" }}
        />
        <button type="submit" style={{ flexGrow: "1" }}>
          SEND
        </button>
      </form>
    </div>
  );
};
