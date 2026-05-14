import { Router } from "express";
import { getAll, getById, create, update, remove, getAllForPost } from "../models/reply";
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
    .get("/post/:id", async (req, res) => {
        const { id } = req.params;
        const { page, pageSize } = req.query;
        const list = await getAllForPost({page: page ? Number(page) : undefined, pageSize: pageSize ? Number(pageSize): undefined}, Number(id));
        const response: DataListEnvelope<Reply> = {
            data: list.result,
            success: true,
            total: list.result.length
        };
        res.send(response);
    })
    .post("/new", async (req, res) => {
        const newReply = await create(req.body, req.user?.userid ?? -1);
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