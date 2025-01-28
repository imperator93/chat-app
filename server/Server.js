import express from "express";
import { Database } from "./FSDatabaseApi/Database.js";
import cors from "cors"

const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})

app.use(cors())

app.get("/", (req, res) => {
    res.send("hello")
})

// KEEP GETTING NULL FOR SOME REASON
//ADD USER
app.post("/chatApp/users", async (req, res) => {
    try {
        await Database.writeToFile(req.body);
        res.status(200).json({
            message: "user created"
        })
    } catch (err) {
        res.status(400).json({
            message: err.mesage
        })
    }
}
)

//GET MESSAGES
app.get("/chatApp/:userID", async (req, res) => {
    try {
        const userID = req.params.userID;
        res.status(200).json({
            message: "works"
        })
    } catch (err) {
        res.status(400).json({
            mesage: err,
        })
    }
})