type Comment = {
    id: number,
    content: string,
    parent_id: number,
    commentator_id: number,
    created_at: string,
    updated_at: string,
    comments_count: number,
    commentator: Commentator
}

type Commentator = {
    id: number,
    name: string,
    email: string,
    created_at: string,
    updated_at: string
}

export type { Comment, Commentator }
