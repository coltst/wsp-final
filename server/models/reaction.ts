import { PagingRequest, Reaction } from "../types";
import { connect } from "./supabase";

async function getAll(params: PagingRequest) {
    const db = connect();
    let query = db.from("reaction").select("*", {count: "estimated"});

    // for debugging only

    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const result = await query;
    if (result.error) {
        throw result.error;
    }
    return { result: result.data as Reaction[], count: result.count || 0};
}

async function getByPostID(id: number) {
    const db = connect();
    // we can't do single because it doesn't allow 0
    const result = await db.from("reaction").select("*").eq("postid", id);
    if (result.error) {
        throw {status: 404, message: "Post not found"};
    }
    return result.data;
}

async function create(reply: Reaction, authorID: number) {
    const db = connect();
    const result = await db
        .from("reaction")
        .insert({
            "userid": authorID,
            "postid": reply.postid,
            "content": reply.content
        })
        .select()
        .single();
    // as I want, this will fail if you try to do the same react twice bc of unique composite primary key constraint.
    if (result.error) {
        throw result.error;
    }
    return result.data as Reaction;
}

async function remove(reply: Reaction) {
    const db = connect();
    const result = await db
        .from("reaction")
        .delete()
        .eq("postid", reply.postid)
        .eq("userid", reply.userid)
        .eq("content", reply.content)
        .select()
        .single()
    if (result.error) {
        throw result.error;
    }
    return result.data as Reaction;
}

export { getAll, getByPostID, create, remove };