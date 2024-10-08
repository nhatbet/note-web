type SelectionType = null | {
    article_status: []
    categories: [],
    tags: []
}

type Option = {
    label: string
    value: string | number
    description: string | null
}

export type { Option, SelectionType }
