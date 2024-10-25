<template>
    <CUserInfo
        :classes="'author px-[20px] h-[50px] mt-[20px] mb-[15px]'"
        :user="profile"
        :info="moment(profile.created_at).format('dddd, MMMM Do YYYY')"
    ></CUserInfo>
    <div class="tab-bar-menu">
        <!-- Tab Bar -->
        <div class="tabs text-base">
            <router-link
                v-for="(tab, index) in tabs"
                :key="index"
                :to="{ name: tab.name }"
                class="tab"
                :class="{ active: $route.name === tab.name }"
            >
                <CIcon :name="tab.icon" class="px-2"></CIcon>
                <span class="tab-name">{{ tab.label }}</span>
            </router-link>
        </div>

        <router-view></router-view>
        <!-- Hiển thị nội dung của tab từ router -->
    </div>
</template>

<script setup lang="ts">
import CUserInfo from '@/components/General/CUserInfo.vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import moment from 'moment'

const tabs = [
    { name: 'VProfile', label: 'Profile', icon: 'user' },
    { name: 'VSummary', label: 'Summary', icon: 'summary' },
    { name: 'VNotification', label: 'Notifications', icon: 'bell' },
    { name: 'VActivity', label: 'Activity', icon: 'hourglass' },
    { name: 'VSetting', label: 'Settings', icon: 'setting' },
]

const authStore = useAuthStore()
const { profile } = storeToRefs(authStore)
</script>

<style lang="scss" scoped>
.tabs {
    display: flex;
    height: 38px;
    border-top: 1px solid var(--border-color-primary);
    border-bottom: 1px solid var(--border-color-primary);

    .tab {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 20%;
        padding-left: 12px;
        padding-right: 12px;
        border-bottom: 1px solid transparent;
        &:hover {
            background-color: var(--bg-color-second);
        }
    }
}

.active {
    border-bottom: 1px solid var(--text-color-second);
    span {
        color: var(--text-color-second);
    }
}

@media (max-width: 500px) {
    .tab .tab-name {
        display: none;
    }
}
</style>
