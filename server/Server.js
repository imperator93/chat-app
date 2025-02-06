import express from "express";
import { Database } from "./FSDatabaseApi/Database.js";
import cors from "cors"

import { User } from "./models/User.model.js";

const app = express();
app.use(express.json());
app.use(cors())

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})


app.get("/", (req, res) => {
    res.send({ some: "hello" })
})

//GET USERS
app.get("/chatApp/users", async (_, res) => {
    try {
        const users = await Database.readUserFromFile();
        res.json(users);
    } catch (err) {
        res.json({
            message: err.mesage
        })
    }
})


//ADD USER
app.post("/chatApp/users", async (req, res) => {
    try {
        const user = new User(req.body.name, req.body.avatar, req.body.isAdmin, req.body.isOnline);
        const ok = await Database.writeUserToFile(user);
        if (ok.success) {
            res.json(user)
        } else {
            res.json({
                message: ok.reason,
            })
        }
    } catch (err) {
        res.json({
            message: err.mesage,
        })
    }
}
)

//GET MESSAGES
app.get("/chatApp/messages/:messageID", async (req, res) => {
    try {
        const messageID = req.params.messageID;
        const messages = await Database.readFromFile(messageID);
        res.json(messages);
    } catch (err) {
        res.json({
            mesage: err.message,
        })
    }
})

//POST MESSAGES
app.post("chatApp/messages")