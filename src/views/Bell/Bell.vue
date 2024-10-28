<template>
    <div class="bell-icon">
        <CIcon
            name="bell"
            class="w-[43px] h-full flex items-center justify-center cursor-pointer"
            @click="openPopup"
        ></CIcon>
        <PopupCommon ref="popup">
            <div class="bell-content text-base">
                search
                <div>See more...</div>
            </div>
        </PopupCommon>
    </div>
</template>

<script lang="ts" setup>
import PopupCommon from '@/components/Parts/PopupCommon.vue'
import { ref } from 'vue'

const popup = ref<InstanceType<typeof PopupCommon> | null>(null)

const openPopup = (event: any) => {
    popup.value?.showPopup(event)
}
</script>

<style lang="scss" scoped>
.bell-icon {
    position: relative;

    .bell-content {
        position: absolute;
        right: -90px;
        width: 400px;
        padding: 16px;
        background-color: var(--bg-color-primary);
        box-shadow: var(--shadow-color-primary) 0px 4px 12px;
        border-radius: 2px;
    }
}
</style>
