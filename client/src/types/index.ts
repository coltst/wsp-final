export type User = {
    username: String,
    logged: boolean
}

export type Post = {
    id: number,
    title: string,
    body: string,
    tags: string[],
    reactions: Object,
    views: number,
    user: string,
    comments: {
        id: number,
        body: string,
        user: string
    }[]
}

export type NewPost = {
    title: string,
    body: string,
    tags: string[],
    user: string
}