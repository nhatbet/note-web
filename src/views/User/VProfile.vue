<template>
    <div class="profile text-base">
        <div>
            <div class="label">Username: name</div>
            <div>{{ profile.name }}</div>
        </div>
        <div>
            <div class="label">Profile Picture</div>
            <div class="avatar">
                <img v-if="profile.avatar" :src="profile.avatar" alt="" />
            </div>
            <div>change img</div>
            <CButton icon="pen" :type="2"></CButton>
        </div>
        <div>
            <div class="label">Email</div>
            <div>{{ profile.email }}</div>
        </div>
        <div>
            <div class="label">Name</div>
            <div>{{ profile.name }}</div>
        </div>
        <CButton text="Save Change" classes="px-[15px]" @clickCButton="close()" :type="1"></CButton>
        <CButton
            text="Delete My Account"
            classes="px-[15px]"
            @clickCButton="close()"
            :type="2"
        ></CButton>
    </div>
</template>

<script lang="ts" setup>
import CButton from '@/components/General/CButton.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
console.log('profile', profile.value.avatar);

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
