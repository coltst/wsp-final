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
    userid: number
    username: string
    creationdate: Date
    bio: string
    userrole?: Role
    posts?: number // returned by the server using a join
    comments?: number // returned by the server using a join
}

export type Post = {
    postid?: number
    creationdate: Date
    content: string
    title: string
    userid?: number
    username?: string // returned by the server using a join
}

export type Reply = {
    replyid?: number
    postid?: number
    userid?: number
    content: string
    username?: string
}

export type Reaction = {
    content: string
    postid: number
    userid: number
    removed?: boolean // in toggle
}

export type Role = "user" | "admin" | undefined;