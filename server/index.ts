import express from "express";
import { config } from "dotenv";
config();

import usersController from "./controllers/users"

const PORT = process.env.PORT ?? 3000;
const HOSTNAME = process.env.BIND ?? "localhost";
const STATIC_DIR = process.env.SERVE ?? "../client/dist";

const app = express();

app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
app.use(express.json());
app.use(express.static(STATIC_DIR))
    .use("/api/v1/users", usersController);

app.get("/api/v1/test", (req, res) => {
    res.send("It works!");
});

app.use( (err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.log(err);
    res.status(500).send("Error")
})

app.listen(PORT, () => {
    console.log(`Listening: http://${HOSTNAME}:${PORT}`);
});