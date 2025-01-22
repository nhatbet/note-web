type ArticleStore = {
    title: string,
    content: string,
    status: number,
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
    created_at: string
    updated_at: string
    comments: []
}

type Author = {
    id: number,
    name: string,
    email: string
}

export type { ArticleStore, ArticleShow, Article, Author }
