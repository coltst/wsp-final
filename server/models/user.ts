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

export { getAll, getById };