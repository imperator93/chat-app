import * as fs from "fs";
import { handleDuplicateUser } from "./../helpers/handleDuplicateUser.js"

const USER_DATABASE_STRING = "C:\\Users\\stoja\\PROJECTS\\Chat-app\\server\\FSDatabaseApi\\UserDatabase.txt"
const MESSAGES_DATABASE_STRING = "C:\\Users\\stoja\\PROJECTS\\Chat-app\\server\\FSDatabaseApi\\MessagesDatabase.txt"

export class Database {
    //NEED FIX
    static writeUserToFile = async (obj) => new Promise((resolve, reject) => {
        fs.readFile(USER_DATABASE_STRING, "utf-8", (err, data) => {

            if (err) reject({ success: false, reason: err.message });

            const users = data.length == 0 ? [] : JSON.parse(data);
            const user = users.find(user => user.name == obj.name)

            if (user.name == obj.name) {
                handleDuplicateUser(users, obj)
                users.push(obj);
            }
            else {
                users.push(obj);
            }
            fs.writeFile(USER_DATABASE_STRING, JSON.stringify(users), (err, data) => {
                if (err) reject(err);
                else resolve({ success: true, user: user });
            })
        })
    })

    static readUserFromFile = async (id = "") => new Promise((resolve, reject) => {
        fs.readFile(USER_DATABASE_STRING, "utf-8", (err, data) => {
            if (err) reject(err.message)
            const users = data.length == 0 ? [] : JSON.parse(data);
            if (id.length != 0) {
                const user = users.find(user => user.userId == id);
                resolve(user ? { success: true, user } : { success: false, reason: "User Not Found!" });
            }
            else
                resolve(users);
        })
    })

    static changeUserFromFile = async (obj) => new Promise((resolve, reject) => {
        fs.readFile(USER_DATABASE_STRING, "utf-8", (err, data) => {
            if (err) reject(err);
            //NEED FIX HERE
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