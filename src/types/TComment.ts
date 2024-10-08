type Comment = {
    id: number,
    content: string,
    parent_id: number,
    commentator_id: number,
    created_at: string,
    updated_at: string,
    comments_count: number
}

export type { Comment }
