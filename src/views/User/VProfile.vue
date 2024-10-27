<template>
    <div class="profile text-base px-[20px] pt-[20px]">
        <div class="pb-[20px]">
            <div class="label">Username: name</div>
            <div>{{ profile.name }}</div>
        </div>
        <div class="pb-[20px]">
            <div class="label pb-[10px]">Profile Picture</div>
            <div class="relative w-[100px]">
                <CAvatar :src="profile.avatar" :name="profile.name" classes="w-[100px] h-[100px] mr-[30px]"></CAvatar>
                <ImageUploader
                    classes="bg-second rounded absolute top-[72%] left-[75%] w-[25px] h-[25px] flex items-center justify-center"
                    collection="avatar"
                    @upload="handleUpload"
                ></ImageUploader>
            </div>
        </div>
        <div class="pb-[20px]">
            <div class="label">Email</div>
            <div>{{ profile.email }}</div>
        </div>
        <div class="pb-[20px]">
            <div class="label">Name</div>
            <div>{{ profile.name }}</div>
        </div>
        <CButton
            text="Save Change"
            classes="px-[15px] py-[7px] rounded mb-[20px]"
            :type="1"
        ></CButton>
        <!-- <CButton
                text="Delete My Account"
                classes="px-[15px] py-[7px] rounded"
                :type="2"
            ></CButton> -->
    </div>
</template>

<script lang="ts" setup>
import CButton from '@/components/General/CButton.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import ImageUploader from '@/components/General/ImageUploader.vue'
import LocalStorageService from '@/services/LocalStorageService'
import CAvatar from '@/components/General/CAvatar.vue'

const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)

const handleUpload = (url: string) => {
    profile.value.avatar = url
    LocalStorageService.saveUser(profile.value)
}
</script>

<style lang="scss" scoped>
.profile {
    min-height: 75vh;

    .label {
        color: #535b67;
        font-size: 20px;
    }
}
</style>
