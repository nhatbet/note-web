type ItemMenu = {
    label: string
    icon: string
    toRoute: string
    items: ItemMenu[]
    isShowSubItem: Boolean | null
}

export type { ItemMenu }
