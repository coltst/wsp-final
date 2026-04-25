export type User = {
    userID: number
    userName: string
    creationDate: Date
    BIO: string
}

export type Post = {
    postID: number
    creationDate: Date
    content: string
    userID: number
}