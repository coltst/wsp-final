import { Router } from "express";
import { getAll, getById, create, update, remove } from "../models/post";
import { DataEnvelope, DataListEnvelope, Post } from "../types";

const app = Router();

app.get("/", async (req, res) => {
   const {result, count} = await getAll(req.query);
   const response: DataListEnvelope<Post> = {
    data: result,
    success: true,
    total: count
   };
   res.send(response);
})
    .get("/:id", async (req, res) => {
        const { id } = req.params;
        const response: DataEnvelope<Post> = {
            data: await getById(Number(id)),
            success: true
        };
        res.send(response);
    })
    .post("/new", async (req, res) => {
        const newPost = await create(req.body, req.user?.userid ?? -1);
        const response: DataEnvelope<Post> = {
            data: newPost,
            success: true
        }
        res.send(response);
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params;
        const updatedPost = await update(Number(id), req.body)
        const response: DataEnvelope<Post> = {
            data: updatedPost as Post,
            success: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params;
        const removedPost = await remove(Number(id));
        const response: DataEnvelope<Post> = {
            data: removedPost,
            success: true,
        }
        res.send(response);
    });

export default app;