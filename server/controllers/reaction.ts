import { Router } from "express";
import { getAll, getByPostID, create, remove } from "../models/reaction";
import { DataEnvelope, DataListEnvelope, Reaction } from "../types";
import { requireAuth } from "../middleware/auth";

const app = Router();

function validateReact(react: string): boolean {
    // apparently Regex has an emoji shortcut
    return /\p{Extended_Pictographic}/u.test(react);
}

app.get("/", async (req, res) => {
    const { result, count } = await getAll(req.query);
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
    .post("/new", requireAuth(), async (req, res) => {
        if (!validateReact(req.body.content ?? "INVALIDREACT")) {
            throw { status: 400, message: "Malformed emoji react" };
        }
        const newReact = await create(req.body, req.user?.userid ?? -1);
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
    .delete("/", requireAuth('admin'), async (req, res) => {
        const removedReact = await remove(req.body);
        const response: DataEnvelope<Reaction> = {
            data: removedReact,
            success: true,
        }
        res.send(response);
    })
    .post("/post/toggle/:id", requireAuth(), async (req, res) => {
        const { id } = req.params;
        const userid = req.user?.userid ?? -1;
        
        if (!validateReact(req.body.content ?? "INVALIDREACT")) {
            throw { status: 400, message: "Malformed emoji react" };
        }
        const reacts = await getByPostID(Number(id));
        if (reacts.filter((react: Reaction) => {
            return react.content == req.body.content && react.postid == Number(id) && react.userid == userid;
        }).length >= 1) {
            const removedReact = await remove({
                userid: userid,
                postid: Number(id),
                content: req.body.content
            });
            const response: DataEnvelope<Reaction> = {
                data: {...removedReact, removed: true},
                success: true,
            }
            res.send(response);
        } else {
            const newReact = await create({
                userid: userid,
                postid: Number(id),
                content: req.body.content
            }, userid);
            const response: DataEnvelope<Reaction> = {
                data: {...newReact, removed: false},
                success: true,
            }
            res.send(response);
        }
    });

export default app;