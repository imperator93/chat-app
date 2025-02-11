import * as fs from "fs";

import { handleDuplicateUser } from "./../helpers/handleDuplicateUser.js"
import { DatabaseResponse } from "../models/DatabaseResponse.js";

const USER_DATABASE_STRING = "C:\\Users\\stoja\\PROJECTS\\Chat-app\\server\\FSDatabaseApi\\UserDatabase.txt"
const MESSAGES_DATABASE_STRING = "C:\\Users\\stoja\\PROJECTS\\Chat-app\\server\\FSDatabaseApi\\MessagesDatabase.txt"

export class Database {
    //NEED FIX
    static writeUserToFile = async (obj) => new Promise((resolve, reject) => {
        fs.readFile(USER_DATABASE_STRING, "utf-8", (err, data) => {

            if (err) reject(new DatabaseResponse(false, err.message, null));

            const users = data.length == 0 ? [] : JSON.parse(data);

            const user = users.find(item => item.name == obj.name);

            if (user) resolve(new DatabaseResponse(false, "User Exists!", null));

            else {
                users.push(obj);

                fs.writeFile(USER_DATABASE_STRING, JSON.stringify(users), (err) => {
                    if (err) reject(new DatabaseResponse(false, err.message, null))
                    else resolve(new DatabaseResponse(true, "User Created!", obj));
                })
            }
        })
    })

    static readUserFromFile = async (obj = null) => new Promise((resolve, reject) => {
        fs.readFile(USER_DATABASE_STRING, "utf-8", (err, data) => {
            if (err) reject(new DatabaseResponse(false, err.message));

            const users = data.length > 0 ? JSON.parse(data) : [];

            if (obj != null) {
                const user = users.find(item => item.name == obj.name);

                if (!user) resolve(new DatabaseResponse(false, "User not Found!", null));

                else if (user.isOnline) resolve(new DatabaseResponse(false, "Username Taken!", null));

                else if (user.password != obj.password) {
                    resolve(new DatabaseResponse(false, "Wrong password", null));
                }
                else {
                    user.password = "";
                    resolve(new DatabaseResponse(true, "user found", user));
                }
            }
            else {
                users.forEach(user => user.password = "");
                resolve(new DatabaseResponse(true, "Users list", users));
            }
        })
    })

    static changeUserFromFile = async (obj) => new Promise((resolve, reject) => {
        fs.readFile(USER_DATABASE_STRING, "utf-8", (err, usersJson) => {

            if (err) reject(err);

            const users = JSON.parse(usersJson);

            const userIndex = users.findIndex(item => item.userId == obj.userId);

            users[userIndex] = obj;

            fs.writeFile(USER_DATABASE_STRING, JSON.stringify(users), (err) => {
                if (err) reject(err.message);
                resolve(users[userIndex]);
            })
        })
    })

    static writeMessagesToFile = async () => new Promise((resolve, reject) => {
        fs.readFile(MESSAGES_DATABASE_STRING, "utf-8", (err, data) => {
            if (err) reject(err.message)

        })
    })
}

const messages = {
    participants: [],
    contents: [],
}