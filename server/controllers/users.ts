import { Router } from "express";
import { getAll, getById, create, update, remove } from "../models/user";
import { DataEnvelope, DataListEnvelope, User } from "../types";

const app = Router();

app.get("/", async (req, res) => {
   const {result, count} = await getAll();
   const sanitizedUsers = result.map((x) => ({
    ...x
    // TODO: add password hash when it is added
   }));
   const response: DataListEnvelope<User> = {
    data: sanitizedUsers,
    success: true,
    total: count
   };
   res.send(response);
})
    .get("/:id", async (req, res) => {
        const { id } = req.params;
        const response: DataEnvelope<User> = {
            data: await getById(Number(id)),
            success: true
        };
        res.send(response);
    })
    .post("/new", async (req, res) => {
        const newUser = await create(req.body);
        const response: DataEnvelope<User> = {
            data: newUser,
            success: true
        }
        res.send(response);
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params;
        const updatedUser = await update(Number(id), req.body)
        const response: DataEnvelope<User> = {
            data: updatedUser as User,
            success: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params;
        const removedUser = await remove(Number(id));
        const response: DataEnvelope<User> = {
            data: removedUser,
            success: true,
        }
        res.send(response);
    });

export default app;