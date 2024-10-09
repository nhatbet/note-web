<template>
    <div class="comment__head flex justify-between" :class="classes">
        <div class="info flex pb-5 text-base items-center">
            <img
                src="https://picsum.photos/300/300"
                class="w-[40px] h-[40px] mr-5 rounded-full"
                alt="avatar"
            />
            <div>
                <p class="">{{ user.name }}</p>
                <p class="">{{ info }}</p>
            </div>
        </div>
        <div class="action">
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
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped></style>
