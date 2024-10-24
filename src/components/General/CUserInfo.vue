<template>
    <div class="comment__head flex justify-between mb-[15px]" :class="classes">
        <div class="info flex text-base items-center">
            <img
                :src="user.avatar"
                class="w-auto h-full mr-5 rounded-full"
                alt="avatar"
            />
            <div>
                <p class="">{{ user.name }}</p>
                <p class="">{{ info }}</p>
            </div>
        </div>
        <div class="action flex items-center relative">
            <slot name="actionRight"></slot>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { UserInfo } from '@/types/TUser'

const props = defineProps({
    user: {
        type: Object,
        default: {} as UserInfo
    },
    info: {
        type: String,
        default: ''
    },
    classes: {
        type: [String, Array, Object],
        default: ''
    }
})
</script>

<style lang="scss" scoped></style>
