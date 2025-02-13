import { useRef } from "react";
import { Message } from "../Types/Message";
import { User } from "../Types/User";
import { MessageComponent } from "./MessageComponent";
import { LoadingComponent } from "./MinorComponents/LoadingComponent";

export const ChatWindow = ({
  users,
  messages,
  handleLogOut,
  handleSendMessage,
}: {
  users: User[];
  messages: Message[] | undefined;
  handleLogOut: () => void;
  handleSendMessage: (event: React.FormEvent) => void;
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  // ONLY WORKS FOR CURRENT USER NEED TO MOVE IT TO PARENT AND SOMEHOW REFERENCE THE ELEMENT IN THE CALLBACK
  const handleScrollToLastMessage = () => {
    setTimeout(() => {
      if (divRef.current) {
        divRef.current.scrollTo(0, divRef.current.scrollHeight);
      }
    }, 10);
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
        ref={divRef}
        style={{
          marginTop: "2%",
          overflowY: "auto",
          width: "95%",
          height: "50%",
          background: "white",
        }}
      >
        {users.length > 0 ? (
          <>
            {messages?.map((messageItem) => (
              <MessageComponent
                users={users}
                key={messageItem.messageId}
                messageItem={messageItem}
              />
            ))}
          </>
        ) : (
          <LoadingComponent loadingType="Loading messages..." />
        )}
      </div>
      <form
        onSubmit={(event) => {
          handleScrollToLastMessage();
          handleSendMessage(event);
        }}
        style={{ width: "90%", display: "flex", marginTop: "5px" }}
      >
        <input
          type="text"
          minLength={5}
          maxLength={20}
          style={{ flexGrow: "10", height: "30px", fontSize: "30px" }}
        />
        <button type="submit" style={{ flexGrow: "1" }}>
          SEND
        </button>
      </form>
      <button onClick={() => handleLogOut()}>LOGOUT</button>
    </div>
  );
};
