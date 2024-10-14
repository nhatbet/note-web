<template>
    <div class="panel-menu select-none h-[100vh] text-lg">
        <MenuItem v-for="(item, index) in menuTree" :key="index" :item="item"></MenuItem>
    </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue'
import { useSelectionStore } from '@/stores/selection'
import type { ItemMenu } from '@/types/TMenu'
import type { Option } from '@/types/TSelect'
import MenuItem from './MenuItem.vue'

export default {
    name: 'Menu',
    props: {
        classes: {
            type: [String, Array],
            default: ''
        }
    },
    components: {
        MenuItem
    },

    setup(props) {
        const selectionStore = useSelectionStore()
        const menuTree: any = ref(null)

        onMounted(async () => {
            const selection = await selectionStore.getData()
            const itemsCategory = selection?.categories?.map((category: Option) => {
                return { label: category.label }
            }) as ItemMenu[]
            const itemsTag = selection?.tags?.map((tag: Option) => {
                return { label: tag.label }
            }) as ItemMenu[]
            menuTree.value = [
                {
                    label: 'Top',
                    icon: 'top',
                    toRoute: 'VArticleCreate'
                },
                {
                    label: 'My Posts',
                    icon: 'post',
                    toRoute: 'VArticleIndex'
                },
                {
                    label: 'Home',
                    icon: 'home',
                    toRoute: 'VHome'
                },
                {
                    label: 'Categories',
                    icon: 'category',
                    children: itemsCategory,
                    isShowSubItem: true,
                },
                {
                    label: 'Tags',
                    icon: 'tag',
                    children: itemsTag,
                    isShowSubItem: true,
                }
            ]
        })

        return { menuTree }
    }
}
</script>
<style lang="scss" scoped></style>
