import { v4 } from "uuid";

export class Message {
    constructor(content, from, participants) {
        this.id = v4();
        this.content = content;
        this.from = from;
        this.participants = participants;
        this.date = new Date(Date.now());
    }
}
