import { PagingRequest, Post } from "../types";
import { connect } from "./supabase";

async function getAll(params: PagingRequest) {
    const db = connect();
    let query = db.from("post").select("*", {count: "estimated"});

    // Search will search by content
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
    return { result: result.data as Post[], count: result.count || 0};
}

async function getById(id: number) {
    const db = connect();
    const result = await db.from("post").select("*").eq("postid", id).single();
    if (result.error) {
        throw {status: 404, message: "Post not found"};
    }
    return result.data;
}

async function create(post: Post, authorID: number) {
    const db = connect();
    const result = await db
        .from("post")
        .insert({
            "userid": authorID,
            "content": post.content,
            "creationdate": (new Date()).toISOString()
        })
        .select()
        .single();
    if (result.error) {
        throw result.error;
    }
    return result.data as Post;
}

async function update(id: number, post: Partial<Post>) {
    const db = connect();
    const result = await db
        .from("post")
        .update(post)
        .eq("postid", id)
        .select()
        .single();
    if (result.error) {
        throw result.error;
    }
    return result.data as Post;
}

async function remove(id: number): Promise<Post> {
    //TODO: remove replies
    const db = connect();
    const result = await db
        .from("post")
        .delete()
        .eq("postid", id)
        .select()
        .single()
    if (result.error) {
        throw result.error;
    }
    return result.data as Post;
}

export { getAll, getById, create, update, remove };