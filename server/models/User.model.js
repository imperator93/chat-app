import { v4 } from "uuid";

export class User {
    userId;
    name;
    avatar;
    isAdmin;
    isOnline;
    constructor(name, avatar, isAdmin, isOnline) {
        this.userId = v4();
        this.name = name;
        this.avatar = avatar;
        this.isAdmin = isAdmin;
        this.isOnline = isOnline;
    }
}