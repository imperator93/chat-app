import { v4 } from "uuid";

export class Message {
    constructor(content, userId) {
        this.messageId = v4();
        this.content = content;
        this.userId = userId;
        this.date = new Date(Date.now());
    }
}
