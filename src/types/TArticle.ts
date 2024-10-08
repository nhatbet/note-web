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

type Author = {
    id: number,
    name: string,
    email: string
}

export type { ArticleStore, ArticleShow, Author }
