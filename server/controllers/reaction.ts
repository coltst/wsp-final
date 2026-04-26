import { Router } from "express";
import { getAll, getByPostID, create, remove } from "../models/reaction";
import { DataEnvelope, DataListEnvelope, Reaction } from "../types";

const app = Router();

function validateReact(react: string): boolean {
    // apparently Regex has an emoji shortcut
    return /\p{Extended_Pictographic}/u.test(react);
}

app.get("/", async (req, res) => {
   const {result, count} = await getAll(req.query);
   const response: DataListEnvelope<Reaction> = {
    data: result,
    success: true,
    total: count
   };
   res.send(response);
})
    // reactions will occur by post
    .get("/post/:id", async (req, res) => {
        const { id } = req.params;
        const reacts = await getByPostID(Number(id));
        const response: DataListEnvelope<Reaction> = {
            data: reacts,
            success: true,
            total: reacts.length
        };
        res.send(response);
    })
    .post("/new", async (req, res) => {
        // TODO: remove this when we do JWT
        if (!validateReact(req.body.content ?? "INVALIDREACT")) {
            // we'll call this a bad request
            throw {status: 400, message: "Malformed emoji react"};
        }
        const newReact = await create(req.body, Number(req.query.author));
        const response: DataEnvelope<Reaction> = {
            data: newReact,
            success: true
        }
        res.send(response);
    })
    // deleting will just be querying DELETE to the root of this controller
    // with the full content of the react
    // since again we are using a composite primary key and no
    // "reactionID" primary key
    // it feels more appropriate to do it this way
    .delete("/", async (req, res) => {
        const removedReact = await remove(req.body);
        const response: DataEnvelope<Reaction> = {
            data: removedReact,
            success: true,
        }
        res.send(response);
    });

export default app;