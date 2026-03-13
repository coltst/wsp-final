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
    userId: number
}