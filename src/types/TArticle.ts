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
    tags: []
}

export type { ArticleStore, ArticleShow }
