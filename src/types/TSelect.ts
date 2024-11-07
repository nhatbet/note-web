type SelectionType = null | {
    article_status: []
    categories: [],
    tags: [],
    report_categories: [],
    genders: []
}

type Option = {
    label: string
    value: string | number
    description: string | null
    meta: Meta | null
}

type Meta = {
    icon: string | null
    color: string | null
}

export type { Option, SelectionType }
