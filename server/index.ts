import express from "express";

const PORT = 3000;
const HOSTNAME = "localhost";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("It works!");
});

app.listen(PORT, () => {
    console.log(`Listening: http://${HOSTNAME}:${PORT}`);
});