type ItemMenu = {
    label: string
    icon: string
    toRoute: string
    children: ItemMenu[] | null
    isShowSubItem: Boolean | null
    color: string | null
}

export type { ItemMenu }
