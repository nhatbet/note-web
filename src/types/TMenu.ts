type ItemMenu = {
    label: string
    icon: string
    toRoute: string
    children: ItemMenu[] | null
    isShowSubItem: Boolean | null
}

export type { ItemMenu }
