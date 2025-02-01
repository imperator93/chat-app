import { rejects } from "assert";
import * as fs from "fs";

const DATABASE_STRING = "C:\\Users\\stoja\\PROJECTS\\Chat-app\\server\\FSDatabaseApi\\DATABASE.txt"

export class Database {

    static writeToFile = async (obj) => new Promise((resolve, reject) => {
        fs.readFile(DATABASE_STRING, "utf-8", (err, data) => {
            if (err) reject({ success: false, reason: err.message });

            const users = data.length == 0 ? [] : JSON.parse(data);
            const user = users.find(user => user.name == obj.name)
            if (user) resolve({ success: false, reason: "User Exists" })
            else {
                users.push(obj);
                fs.writeFile(DATABASE_STRING, JSON.stringify(users), (err, data) => {
                    if (err) reject(err);
                    else resolve({ success: true, obj });
                })
            }
        })
    })

    static readFromFile = async (id = "") => new Promise((resolve, reject) => {
        fs.readFile(DATABASE_STRING, "utf-8", (err, data) => {
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
}
