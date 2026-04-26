import { User } from "../types";
import { connect } from "./supabase";

async function getAll() {
    const db = connect();
    let query = db.from("users").select("*", {})

    const result = await query;
    if (result.error) {
        throw result.error;
    }
    return { result: result.data as User[], count: result.count || 0};
}

async function getById(id: number) {
    const db = connect();
    const result = await db.from("users").select("*").eq("id", id).single();
    if (result.error) {
        throw {status: 404, message: "User not found"};
    }
    return result.data;
}

async function create(user: User) {
    const db = connect();
    const result = await db
        .from("users")
        .insert({
            "username": user.userName,
            "bio": user.BIO,
            "creationdate": (new Date()).toISOString()
        })
        .select()
        .single();
    if (result.error) {
        throw result.error;
    }
    return result.data as User;
}

export { getAll, getById, create };