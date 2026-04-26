import { Router } from "express";
import { getAll, getById } from "../models/user";
import { User } from "../types";

const app = Router();

app.get("/", async (req, res) => {
   const {result, count} = await getAll();
   const sanitizedUsers = result.map((x) => ({
    ...x
    // TODO: add password hash when it is added
   }))
   res.send(sanitizedUsers);
})
    .get("/:id", async (req, res) => {
        const { id } = req.params;
        res.send(await getById(Number(id)));
    });

export default app;