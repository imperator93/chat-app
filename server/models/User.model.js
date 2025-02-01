import { v4 } from "uuid";

export class User {
    constructor(name, avatar, isAdmin, isOnline) {
        this.userId = v4();
        this.name = name;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
        this.isOnline = isOnline;
    }
}