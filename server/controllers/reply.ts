import { Router } from "express";
import { getAll, getById, create, update, remove } from "../models/reply";
import { DataEnvelope, DataListEnvelope, Reply } from "../types";

const app = Router();

app.get("/", async (req, res) => {
   const {result, count} = await getAll(req.query);
   const response: DataListEnvelope<Reply> = {
    data: result,
    success: true,
    total: count
   };
   res.send(response);
})
    .get("/:id", async (req, res) => {
        const { id } = req.params;
        const response: DataEnvelope<Reply> = {
            data: await getById(Number(id)),
            success: true
        };
        res.send(response);
    })
    .post("/new", async (req, res) => {
        // TODO: remove this when we do JWT
        const newReply = await create(req.body, Number(req.query.author));
        const response: DataEnvelope<Reply> = {
            data: newReply,
            success: true
        }
        res.send(response);
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params;
        const updatedReply = await update(Number(id), req.body)
        const response: DataEnvelope<Reply> = {
            data: updatedReply as Reply,
            success: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params;
        const removedReply = await remove(Number(id));
        const response: DataEnvelope<Reply> = {
            data: removedReply,
            success: true,
        }
        res.send(response);
    });

export default app;