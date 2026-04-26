import { PagingRequest, User } from "../types";
import { connect } from "./supabase";

async function getAll(params: PagingRequest) {
    const db = connect();
    let query = db.from("users").select("*", {count: "estimated"});

    if (params?.search) {
        query = query.or(
            `username.ilike.%${params.search}%`,
        )
    }
    if (params?.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

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

async function update(id: number, user: Partial<User>) {
    const db = connect();
    const result = await db
        .from("users")
        .update(user)
        .eq("userid", id)
        .select()
        .single();
    if (result.error) {
        throw result.error;
    }
    return result.data as User;
}

async function remove(id: number): Promise<User> {
    const db = connect();
    const result = await db
        .from("users")
        .delete()
        .eq("userid", id)
        .select()
        .single()
    if (result.error) {
        throw result.error;
    }
    return result.data as User;
}

export { getAll, getById, create, update, remove };