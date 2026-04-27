export type DataEnvelope<T> = {
    data: T
    success: boolean
    message?: string
}

export type DataListEnvelope<T> = DataEnvelope<T[]> & {
    total: number
}

export type PagingRequest = {
    page?: number
    pageSize?: number
    search?: string
    sortBy?: string
    descending?: boolean
}

export type User = {
    userID: number
    userName: string
    creationDate: Date
    BIO: string
}

export type Post = {
    postID?: number
    creationDate: Date
    content: string
    title: string
    userID?: number
}

export type Reply = {
    replyID?: number
    postID?: number
    userID?: number
    content: string
}

export type Reaction = {
    content: string
    postID: number
    userID: number
}