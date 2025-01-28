import * as fs from "fs/promises";

const DATABASE_STRING = "C:\\Users\\stoja\\PROJECTS\\Chat-app\\server\\FSDatabaseApi\\DATABASE.txt"

export class Database {
    static writeToFile = async (obj) => {
        let usersFromFile = "";
        fs.readFile(DATABASE_STRING, "utf-8", (err, data) => {
            if (err) throw new Error(err)
            else usersFromFile += data
        })
        const users = usersFromFile.length > 0 ? JSON.parse(usersFromFile) : [];
        users.push(obj);
        fs.writeFile(DATABASE_STRING, JSON.stringify(users), (err) => {
            if (err) throw new Error(err)
        })
    }
    static readFromFile = async (id) => {
        try {
            const user = await fs.readFile(DATABASE_STRING)
        } catch (err) {
            throw new Error(err)
        }
    }
}