export class message {
    constructor(id, content, from, toGroup) {
        this.id = id;
        this.content = content;
        this.from = from;
        this.toGroup = toGroup;
        this.date = new Date(Date.now().toLocaleString());
    }
}
