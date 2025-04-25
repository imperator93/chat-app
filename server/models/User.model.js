import { v4 } from "uuid";

export class User {
    constructor(name, avatar, isOnline, password) {
        this.userId = v4();
        this.name = name;
        this.avatar = avatar;
        this.isOnline = isOnline;
        this.password = password;
    }
}