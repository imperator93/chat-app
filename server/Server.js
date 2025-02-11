import express from "express";
import { Database } from "./FSDatabaseApi/Database.js";
import cors from "cors"

import { User } from "./models/User.model.js";
import { GetUser } from "./models/GetUser.js";

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

//GET ALL USERS
app.get("/chatApp/users", async (_, res) => {
    try {
        const dbResponse = await Database.readUserFromFile();
        res.json(dbResponse)
    } catch (err) {
        res.json({
            message: err.mesage
        })
    }
})

//GET USER
app.post("/chatApp/user/login", async (req, res) => {
    try {
        const user = new GetUser(req.body.name, req.body.password);

        const dbResponse = await Database.readUserFromFile(user);

        res.json(dbResponse);

    } catch (err) {
        res.json({
            message: err
        })
    }
})

//ADD USER
app.post("/chatApp/user/register", async (req, res) => {
    try {
        const user = new User(req.body.name, req.body.avatar, req.body.isAdmin, req.body.isOnline, req.body.password);

        const dbResponse = await Database.writeUserToFile(user);

        res.json(dbResponse);

    } catch (err) {
        res.json({
            message: err.message
        })
    }
}
)

//UPDATE USER
// app.put("/chatApp/users", async (req, res) => {
//     try {
//         const user = await Database.changeUserFromFile(req.body);
//         res.json(user);
//     } catch (err) {
//         res.json({ message: err.message })
//     }
// })


//POST MESSAGES
app.post("chatApp/messages")