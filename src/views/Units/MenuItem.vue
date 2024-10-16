<template>
    <div :class="{ 'border-top py-[6px]': !isFirstItem && level == 1 && hasChildren(item)}">
        <div
            class="label-item cursor-pointer flex items-center relative  text-[16px]"
            :class="[{ active: isActive(item) }, {'!h-[35px]': level != 1}, classes]"
            @click="handleClick(item)"
        >
            <CIcon
                name="angle-right"
                v-if="level == 1 && hasChildren(item)"
                :classes="['inline-block mr-5 cannot-hover', { rotate: isShowSubItem(item) }]"
            />
            <CIcon class="mr-5" v-else-if="item?.icon" :name="item?.icon" />

            <span>{{ item.label }}</span>
            <!-- <span class="absolute right-[5px]" v-if="hasChildren(item)">
                <CIcon name="angle-right" :classes="['inline-block', {'rotate': isShowSubItem(item)}]" />
            </span> -->
        </div>

        <div v-show="isShowSubItem(item)">
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
        type: String,
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
const currentRouteName = computed(() => route.name)

const isShowSubItem = (item: ItemMenu) => {
    return !!(item?.isShowSubItem && item?.children)
}
const hasChildren = (item: ItemMenu) => {
    return !!item?.children
}
const isActive = (item: ItemMenu) => {
    return currentRouteName.value == item.toRoute
}
const handleClick = (item: ItemMenu) => {
    if (item?.toRoute) {
        router.push({ name: item.toRoute })
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
}

.active {
    background-color: var(--bg-color-second);
    span {
        font-weight: bold;
    }
}

.border-bottom {
    border-bottom: 1px solid var(--border-color-primary);
}

.border-top {
    border-top: 1px solid var(--border-color-primary);
}

.rotate {
    transform: rotate(90deg);
}
</style>
