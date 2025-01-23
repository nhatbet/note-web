<template>
    <div class="profile text-base px-[20px] pt-[20px]">
        <div class="pb-[20px]">
            <div class="label">Account</div>
            <div>
                <span v-if="profile.provider_name">Login By {{ profile.provider_name }}</span>
                <span v-else>{{ profile.username }}</span>
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
        <div class="pb-[20px]">
            <div class="label pb-[10px]">Avatar</div>
            <div class="relative w-[100px]">
                <CAvatar
                    :src="profile.avatar"
                    :name="profile.name"
                    classes="w-[100px] h-[100px] mr-[30px]"
                ></CAvatar>
                <ImageUploader
                    classes="bg-second rounded absolute top-[72%] left-[75%] w-[25px] h-[25px] flex items-center justify-center"
                    collection="avatar"
                    @upload="handleUpload"
                ></ImageUploader>
            </div>
        </div>
        <CSelect
            v-model="profile.gender"
            :options="selection?.genders"
            classes="mb-2"
            label="Status"
        ></CSelect>
        <CButton
            text="Save"
            :variant="'outlined'"
            :severity="'help'"
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
import { useSelectionStore } from '@/stores/selection'
import { onMounted, ref } from 'vue'
import type { SelectionType } from '@/types/TSelect'

const selectionStore = useSelectionStore()
const selection = ref<SelectionType>()
const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
console.log('profile.value', profile.value)

onMounted(async () => {
    selection.value = await selectionStore.getData()
})

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
