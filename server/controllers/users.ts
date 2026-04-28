import { Router } from "express";
import { getAll, getById, create, update, remove, login } from "../models/users";
import { DataEnvelope, DataListEnvelope, User } from "../types";
import { requireAuth, validateJWT } from "../middleware/auth";

const app = Router();

app.get("/", async (req, res) => {
   const {result, count} = await getAll(req.query);
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
    .get("/me", requireAuth(), async (req, res) => {
    const userId = req.user?.userid ?? null;
    if (!userId) {
        res.status(401).send({
            data: null,
            isSuccess: false,
            message: "Unauthorized",
        });
    } else {
        res.status(200).send({
            data: req.user,
            success: true
        });
    }
        return;
    })
    .post("/login", async (req, res) => {
        const { username, password } = req.body

        const response: DataEnvelope<{ token: string; user: User }> = {
            data: await login(username, password),
            success: true,
        }
        res.send(response)
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
        const newUser = await create(req.body, "user");
        const response: DataEnvelope<User> = {
            data: {...newUser, userrole: "user"},
            success: true
        }
        res.send(response);
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params;
        const updatedUser = await update(Number(id), req.body);
        // only allow changing role if you are admin
        if (req.user?.userrole !== "admin") {
            if (updatedUser['userrole']) { delete updatedUser['userrole']; }
        }
        const response: DataEnvelope<User> = {
            data: updatedUser as User,
            success: true,
        }
        res.send(response)
    })
    .delete("/:id", requireAuth('admin'), async (req, res) => {
        const { id } = req.params;
        const removedUser = await remove(Number(id));
        const response: DataEnvelope<User> = {
            data: removedUser,
            success: true,
        }
        res.send(response);
    });

export default app;