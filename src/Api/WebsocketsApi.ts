import { SetStateAction } from "react";
import { Message } from "../Types/Message";

export class WebsocketApi {
  url: string = "ws://test.com";
  socket: WebSocket;
  setMessage: React.Dispatch<SetStateAction<Message[]>>;

  constructor(callback: React.Dispatch<SetStateAction<Message[]>>) {
    this.setMessage = callback;

    this.socket = new WebSocket(this.url);

    this.socket.onopen = (event: Event) => {
      console.log("Connection opened", event);
    };

    this.socket.onmessage = (event: MessageEvent) => {
      this.setMessage(event.data);
    };

    this.socket.onerror = (event: Event) => {
      console.log(event);
    };

    this.socket.onclose = (event: CloseEvent) => {
      console.log("Connection closed", event);
    };
  }
}
