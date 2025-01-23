type ArticleStore = {
    title: string,
    content: string,
    status: number,
    category_id: number,
    tags: []
}

type ArticleShow = {
    id: number,
    title: string,
    content: string,
    status: number,
    tags: [],
    comments: [],
    author: Author,
    created_at: string
}

type Article = {
    id: number
    title: string
    content: string
    author_id: number
    created_at: number
    updated_at: number
    author: Author
}

type Author = {
    id: number,
    name: string,
    email: string,
    dob: string|null,
    gender: string,
    created_at: string,
    avatar: string|null
}

export type { ArticleStore, ArticleShow, Article, Author }
