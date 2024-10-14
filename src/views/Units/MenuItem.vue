<template>
    <div
        class="label-item cursor-pointer flex items-center relative"
        :class="[{ active: isActive(item) }, classes]"
        @click="handleClick(item)"
    >
        <CIcon class="px-2" v-if="item?.icon" :name="item?.icon" />
        <span>{{ item.label }}</span>
        <span class="absolute right-[5px]" v-if="canShowAngleIcon(item)">
            <CIcon name="angle-down" v-if="canShowSubItem(item)" />
            <CIcon name="angle-right" v-else />
        </span>
    </div>

    <div v-show="canShowSubItem(item)">
        <MenuItem classes="pl-[20px]" v-for="(subItem, index) in item.children" :key="index" :item="subItem"></MenuItem>
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
        default: '',
    }
})

const route = useRoute()
const router = useRouter()
const currentRouteName = computed(() => route.name)

const canShowSubItem = (item: ItemMenu) => {
    return !!(item?.isShowSubItem && item?.children)
}
const canShowAngleIcon = (item: ItemMenu) => {
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
    height: 48px;

    &:hover {
        background-color: var(--bg-color-second);
    }
}

.active {
    background-color: var(--bg-color-second);
}
</style>
