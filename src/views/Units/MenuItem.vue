<template>
    <div :class="{ 'menu-dropdown': !isFirstItem && level == 1 && hasChildren(item as ItemMenu) }">
        <div
            class="label-item cursor-pointer flex items-center text-[16px]"
            :class="[{ active: isActive(item as ItemMenu) }, { '!h-[35px]': level != 1 }, classes]"
            @click="handleClick(item as ItemMenu)"
        >
            <!-- Display icon -->
            <div class="mr-[15px] flex items-center">
                <!-- Display for color bg -->
                <span
                    class="bg-icon inline-block"
                    v-if="item?.color"
                    :style="{ background: item.color }"
                >
                </span>
                <!-- Display for btn right - down -->
                <CIcon
                    name="angle-right"
                    v-else-if="level == 1 && hasChildren(item as ItemMenu)"
                    :classes="[
                        'inline-block cannot-hover icon',
                        { rotate: isShowSubItem(item as ItemMenu) }
                    ]"
                />
                <!-- Display for icon from prop -->
                <CIcon v-else-if="item?.icon" :name="item?.icon" />
            </div>

            <span>{{ item?.meta?.icon }} {{ item.label }}</span>
        </div>

        <div v-show="isShowSubItem(item as ItemMenu)">
            <MenuItem
                classes="pl-[20px]"
                v-for="(subItem, index) in item.children"
                :key="index"
                :item="subItem"
            ></MenuItem>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { ItemMenu } from '@/types/TMenu'
import { useRouter } from 'vue-router'

const props = defineProps({
    item: {
        type: [Object],
        default: {} as ItemMenu
    },
    classes: {
        type: [String, Object],
        default: ''
    },
    isLastItem: {
        type: Boolean,
        default: false
    },
    isFirstItem: {
        type: Boolean,
        default: false
    },
    level: {
        type: [String, Number],
        default: null
    }
})

const route = useRoute()
const router = useRouter()
const routeName = computed(() => {
    return route.query.name
})

const isShowSubItem = (item: ItemMenu) => {
    return !!(item?.isShowSubItem && item?.children)
}
const hasChildren = (item: ItemMenu) => {
    return !!item?.children
}
const isActive = (item: ItemMenu) => {
    if (item.toRoute?.query?.name) {
        return routeName.value === item.toRoute?.query?.name
    }
    return false
}
const handleClick = (item: ItemMenu) => {
    if (item?.toRoute) {
        router.push(item.toRoute)
    } else if (item.isShowSubItem) {
        item.isShowSubItem = !item.isShowSubItem
    } else {
        item.isShowSubItem = true
    }
}
</script>

<style lang="scss" scoped>
.label-item {
    padding: 0 16px;
    height: 35px;

    &:not(:has(.cannot-hover)):hover {
        background-color: var(--bg-color-second);
    }

    .icon svg {
        width: 22px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.active {
    background-color: var(--bg-color-second);
    span {
        font-weight: bold;
    }
}

.menu-dropdown {
    border-top: 1px solid var(--border-color-primary);
    padding-top: 6px;
    padding-bottom: 6px;
}

.rotate {
    transform: rotate(90deg);
}
.bg-icon {
    border-radius: 1px;
    width: 13px;
    height: 13px;
}
</style>
