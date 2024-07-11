<template>
    <div class="panel-menu select-none h-[100vh]">
        <div v-for="(item, index) in menu" :key="index">
            <div
                class="label-item cursor-pointer flex items-center relative"
                :class="{ active: isActive(item) }"
                @click="handleClick(item)"
            >
                <CIcon class="px-2" v-if="item?.icon" :name="item?.icon" />
                <span>{{ item.label }}</span>
                <span class="absolute right-[5px]" v-if="canShowAngleIcon(item)">
                    <CIcon name="angle-down" v-if="canShowSubItem(item)" />
                    <CIcon name="angle-right" v-else />
                </span>
            </div>
            <div
                class="sub-item"
                v-show="canShowSubItem(item)"
                v-for="(subItem, subIndex) in item.items"
                :key="subIndex"
            >
                <div
                    class="label-item pl-5 cursor-pointer flex items-center"
                    :class="{ active: isActive(subItem) }"
                    @click="handleClick(subItem)"
                >
                    <CIcon class="px-2" v-if="subItem?.icon" :name="subItem?.icon" />
                    <span>{{ subItem.label }}</span>
                    <span class="absolute right-[5px]" v-if="canShowAngleIcon(subItem)">
                        <CIcon name="angle-down" v-if="canShowSubItem(subItem)" />
                        <CIcon name="angle-right" v-else />
                    </span>
                </div>
                <div
                    class="mini-sub-item"
                    v-show="canShowSubItem(subItem)"
                    v-for="(miniSubItem, miniSubIndex) in subItem.items"
                    :key="miniSubIndex"
                >
                    <div
                        class="label-item pl-10 cursor-pointer flex items-center"
                        :class="{ active: isActive(miniSubItem) }"
                        @click="handleClick(miniSubItem)"
                    >
                        <CIcon class="px-2" v-if="miniSubIndex?.icon" :name="miniSubIndex?.icon" />
                        <span>{{ miniSubItem.label }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSelectionStore } from '@/stores/selection'

interface TItem {
    label: string
    icon: string | null
    toRoute: string
    items: [TItem]
    isShowSubItem: Boolean | null
}

export default {
    name: 'UPanelMenu',
    props: {},
    components: {},

    setup(props) {
        const route = useRoute()
        const currentRouteName = computed(() => route.name)
        const selectionStore = useSelectionStore()

        const menu: any = ref(null)
        onMounted(async () => {
            const selection = await selectionStore.getData()
            const itemsCategory =
                selection?.categories?.map((category: any) => {
                    return { label: category.label }
                }) || []
            menu.value = [
                {
                    label: 'My Posts',
                    icon: 'post',
                    toRoute: 'VArticle'
                },
                {
                    label: 'Home',
                    icon: 'home',
                    toRoute: 'VHome'
                },
                {
                    label: 'Category',
                    icon: 'category',
                    items: itemsCategory
                }
            ]
        })

        return { menu, currentRouteName }
    },

    methods: {
        handleClick(item: TItem) {
            if (item?.toRoute) {
                this.$router.push({ name: item.toRoute })
            } else if (item.isShowSubItem) {
                item.isShowSubItem = !item.isShowSubItem
            } else {
                item.isShowSubItem = true
            }
        },
        canShowSubItem(item: TItem) {
            return !!(item?.isShowSubItem && item?.items)
        },
        canShowAngleIcon(item: TItem) {
            return !!item?.items
        },
        isActive(item: TItem) {
            return this.currentRouteName == item.toRoute
        }
    }
}
</script>
<style lang="scss" scoped>
.panel-menu {
    font-size: 1rem;
}

.label-item {
    height: 33px;

    &:hover {
        background: #e5e7ea;
    }
}

.active {
    background: #e5e7ea;
}
</style>
