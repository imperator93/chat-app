import express from "express";
import { Database } from "./FSDatabaseApi/Database.js";
import cors from "cors"

import { User } from "./models/User.model.js";

const app = express();
app.use(express.json());

const PORT = 3000;


app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

app.use(cors())

app.get("/", (req, res) => {
    res.send({ some: "hello" })
})

//ADD USER
app.post("/chatApp/users", async (req, res) => {
    try {
        const user = new User(req.body.name, req.body.avatar, req.body.isAdmin, req.body.isOnline);
        const ok = await Database.writeToFile(user);
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

//GET USERS
app.get("/chatApp/users", async (req, res) => {
    try {
        const users = await Database.readFromFile()
        res.json(users);
    } catch (err) {
        res.json({
            message: err.mesage
        })
    }
})

//GET MESSAGES
app.get("/chatApp/users/:userId", async (req, res) => {
    try {
        const userID = req.params.userId;
        const user = await Database.readFromFile(userID);
        res.json(user);
    } catch (err) {
        res.json({
            mesage: err.message,
        })
    }
})