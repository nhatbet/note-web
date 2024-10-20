<template>
    <div class="panel-menu select-none text-lg">
        <MenuItem
            v-for="(item, index) in menuTree"
            :key="index"
            :item="item"
            :isFirstItem="index == 0"
            level="1"
            :classes="item.classes"
        ></MenuItem>
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
                return { label: category.label, color: category.meta?.color }
            }) as ItemMenu[]
            const itemsTag = selection?.tags?.map((tag: Option) => {
                let labelIcon = tag.meta?.icon ? tag.meta?.icon + '-' : ''
                return { label: labelIcon + tag.label, icon: 'tag' }
            }) as ItemMenu[]
            menuTree.value = [
                {
                    label: 'Topics',
                    icon: 'layer-group',
                    toRoute: 'VHome'
                },
                {
                    label: 'My Posts',
                    icon: 'user',
                    toRoute: 'VArticleIndex'
                },
                {
                    label: 'Create Post',
                    icon: 'plus',
                    toRoute: 'VArticleCreate'
                },
                {
                    label: 'Filter',
                    icon: 'filter'
                },
                {
                    label: 'More',
                    icon: 'vertical-dot',
                    classes: 'mb-[6px]'
                    // toRoute: 'VHome'
                },
                {
                    label: 'CATEGORIES',
                    icon: 'category',
                    children: itemsCategory,
                    isShowSubItem: true
                },
                {
                    label: 'TAGS',
                    children: itemsTag,
                    isShowSubItem: true
                },
                {
                    label: 'CHANNELS',
                    children: [
                        {label: 'Share Chat', icon: 'chat'}
                    ],
                    isShowSubItem: true
                }
            ]
        })

        return { menuTree }
    }
}
</script>
<style lang="scss" scoped>
.panel-menu {
    overflow-y: scroll;
    overflow-x: hidden;
    // --scrollbarBg: transparent;
    // --scrollbarThumbBg: var(--primary-low);
    // --scrollbarWidth: 0.5em;
    scrollbar-color: rgba(0, 0, 0, 0) transparent;

    position: sticky;
    top: 0;
    height: 100vh;
    // padding: 1.5rem 2rem 1rem;
    padding: 2rem 0.5rem 1rem 2rem;
}

@media (max-width: 768px) {
    .panel-menu {
        overflow: auto;
        padding: 2rem;
    }
}
</style>
