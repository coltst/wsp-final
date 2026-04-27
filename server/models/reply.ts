import { PagingRequest, Reply } from "../types";
import { connect } from "./supabase";

async function getAll(params: PagingRequest) {
    const db = connect();
    let query = db.from("reply").select("*", {count: "estimated"});

    // Search will search by content
    // TODO: maybe custom reply search paging request?? this function is useful for debugging
    // but not much else
    if (params?.search) {
        query = query.or(
            `content.ilike.%${params.search}%`,
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
    return { result: result.data as Reply[], count: result.count || 0};
}


async function getAllForPost(params: PagingRequest, postID: number) {
    const db = connect();
    let query = db.from("reply").select("*, userreplyfk (username)", {count: "estimated"});

    // Search will search by content
    // TODO: maybe custom reply search paging request?? this function is useful for debugging
    // but not much else
    if (params?.search) {
        query = query.or(
            `content.ilike.%${params.search}%`,
        )
    }
    if (params?.sortBy) {
        query = query.order(params.sortBy, { ascending: !params.descending })
    }
    const page = params?.page || 1
    const pageSize = params?.pageSize || 10
    const start = (page - 1) * pageSize
    query = query.range(start, start + pageSize - 1)

    const result = await query.eq("postid", postID);
    if (result.error) {
        throw result.error;
    }
    return { result: result.data.map((datum) => {
        datum['username'] = datum['userreplyfk']['username'];
        delete datum['userreplyfk'];
        return datum;
    }) as Reply[], count: result.count || 0};
}

async function getById(id: number) {
    const db = connect();
    const result = await db.from("reply").select("*").eq("replyid", id).single();
    if (result.error) {
        throw {status: 404, message: "Reply not found"};
    }
    return result.data;
}

async function create(reply: Reply, authorID: number) {
    const db = connect();
    const result = await db
        .from("reply")
        .insert({
            "userid": authorID,
            "postid": reply.postid,
            "content": reply.content,
            "creationdate": (new Date()).toISOString()
        })
        .select()
        .single();
    if (result.error) {
        throw result.error;
    }
    return result.data as Reply;
}

async function update(id: number, reply: Partial<Reply>) {
    const db = connect();
    const result = await db
        .from("reply")
        .update(reply)
        .eq("replyid", id)
        .select()
        .single();
    if (result.error) {
        throw result.error;
    }
    return result.data as Reply;
}

async function remove(id: number): Promise<Reply> {
    const db = connect();
    const result = await db
        .from("reply")
        .delete()
        .eq("replyid", id)
        .select()
        .single()
    if (result.error) {
        throw result.error;
    }
    return result.data as Reply;
}

export { getAll, getById, getAllForPost, create, update, remove };