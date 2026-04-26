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
    postID: number
    creationDate: Date
    content: string
    userID: number
}