import { CON_STRING } from "../CONSTANTS/CONNECTION_STRING";
import { Message } from "../Types/Message";
import { DatabaseResponse } from "../Types/DatabaseResponse";
import { SetStateAction } from "react";

// GET MESSAGES
export const getMessages = async (
  setMessages: React.Dispatch<SetStateAction<Message[]>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/messages`);
  const dbResponse: DatabaseResponse<Message[]> = await response.json();
  setMessages(dbResponse.data);
};

// POST MESSAGE
export const postMessage = async (
  message: Omit<Message, "messageId" | "date">,
  setMessages: React.Dispatch<SetStateAction<Message[]>>
) => {
  const response = await fetch(`${CON_STRING}/chatApp/messages`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(message),
  });

  const dbResponse: DatabaseResponse<Message> = await response.json();
  setMessages((prev) => [...prev, dbResponse.data]);
};
