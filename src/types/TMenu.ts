type ItemMenu = {
    label: string
    icon: string
    toRoute: Route
    children: ItemMenu[] | null
    isShowSubItem: Boolean | null
    color: string | null
}

type Route = {
    name: string
    query: any
}

export type { ItemMenu }
