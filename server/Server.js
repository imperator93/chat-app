import express from "express";
import { Database } from "./FSDatabaseApi/Database.js";
import cors from "cors"

import { User } from "./models/User.model.js";
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

app.use(cors())

app.get("/", (req, res) => {
    res.send({ some: "hello" })
})

// KEEP GETTING NULL FOR SOME REASON
//ADD USER
app.post("/chatApp/users", async (req, res) => {
    try {
        const user = new User(name = req.body.name, req.body.avatar, req.body.isAdmin, req.body.isOnline);
        await Database.writeToFile(user);
        res.sendStatus(200).json({
            message: "user created",
            user: user,

        })
    } catch (err) {
        res.sendStatus(400).json({
            message: err.mesage
        })
    }
}
)

//GET USERS
app.get("/chatApp/users", async (req, res) => {
    try {
        const users = await Database.readFromFile()
        res.send(users);
    } catch (err) {
        res.sendStatus(400).json({
            message: err.mesage
        })
    }
})

//GET MESSAGES
app.get("/chatApp/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        res.sendStatus(200).json({
            message: "works"
        })
    } catch (err) {
        res.status(400).json({
            mesage: err,
        })
    }
})