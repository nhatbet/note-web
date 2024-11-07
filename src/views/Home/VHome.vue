<template>
    <div class="app" @scroll="onScroll()">
        <nav class="navbar" ref="navbarHeader">
            <div class="container nav-container">
                <div class="navbar-left">
                    <input class="hamburger-checkbox" type="checkbox" v-model="visibleMenubar" />
                    <div class="hamburger-lines">
                        <span class="line line1"></span>
                        <span class="line line2"></span>
                        <span class="line line3"></span>
                    </div>
                    <div class="title flex cursor-pointer" @click="gotoHome">
                        <img src="/logo-icon.png" class="logo mr-5" alt="logo" />
                        <div class="info pl-5 text-lg flex items-center bold">Share Blog</div>
                    </div>
                </div>
                <div class="navbar-right content-center">
                    <div class="flex">
                        <Search></Search>
                        <Bell v-if="isAuthenticated"></Bell>
                        <CThemeMode classes="mx-5"></CThemeMode>
                        <div v-if="!isLoggedIn">
                            <CButton
                                text="Sign in"
                                @click="visibleLogin = !visibleLogin"
                            ></CButton>
                        </div>
                        <div class="navbar-avatar" v-else>
                            <DropdownMenu></DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <div class="body">
            <div class="menu">
                <div class="menu-items">
                    <Menu classes="" />
                </div>
            </div>
            <div class="main p-3">
                <RouterView />
            </div>
        </div>

        <!-- List Dialog -->
        <Login v-model="visibleLogin" />
        <CCloak v-model="visibleMenubar" v-if="widthIsMaxMD()"></CCloak>
        <Bottom></Bottom>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import Menu from '../Units/Menu.vue'
import Login from '../Login/Login.vue'
import DropdownMenu from '../Units/DropdownMenu.vue'
import CCloak from '@/components/General/CCloak.vue'
import { useScreenSize } from '@/stores/ScreenSize'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import CThemeMode from '@/components/General/CThemeMode.vue'
import Bottom from '../Units/Bottom.vue'
import Search from '../Search/Search.vue'
import { useRouter } from 'vue-router'
import Bell from '../Bell/Bell.vue'

const router = useRouter()
const visibleMenubar = ref(true)
const screenSizeStore = useScreenSize()
const { screenWidth } = storeToRefs(screenSizeStore)
const { widthIsMaxMD } = screenSizeStore
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const { isShowLoginForm } = storeToRefs(authStore)
const visibleLogin = ref(isShowLoginForm)
const isLoggedIn = computed(() => !!isAuthenticated.value)
const navbarHeader: any = ref(null)

if (screenWidth.value < 768) {
    visibleMenubar.value = false
}

const onScroll = () => {
    var height = navbarHeader.value.scrollHeight
    if (height > 100) height = 100
    navbarHeader.value.style.transform = `translateY(${-height}px)`
}

const gotoHome = () => {
    router.push({ name: 'VHome' })
}
</script>

<style lang="scss" scoped>
.navbar-right {
    position: absolute;
    right: 15px;
    height: 100%;
}

.container {
    max-width: 1360px;
    margin: auto;
}

.navbar {
    width: 100%;
    box-shadow: 0 1px 4px var(--shadow-color-primary);
    background-color: var(--bg-color-primary);
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 10;
}

.title {
    margin-left: 80px;
    .logo {
        border-radius: 10px;
        width: 30px;
    }
    .info {
        border-left: 1px solid var(--border-color-primary);
    }
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 56px;
}

.nav-container .hamburger-checkbox {
    position: absolute;
    display: block;
    height: 32px;
    width: 32px;
    top: 20px;
    left: 20px;
    z-index: 5;
    opacity: 0;
    cursor: pointer;
}

.nav-container .hamburger-lines {
    display: block;
    height: 26px;
    width: 32px;
    position: absolute;
    top: 17px;
    left: 20px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.nav-container .hamburger-lines .line {
    display: block;
    height: 4px;
    width: 100%;
    border-radius: 10px;
    background-color: #99a0ac;
}

.nav-container .hamburger-lines .line1 {
    transform-origin: 0% 0%;
    transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
    transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
    transform-origin: 0% 100%;
    transition: transform 0.4s ease-in-out;
}

.nav-container input[type='checkbox'].hamburger-checkbox:checked ~ .menu-items {
    transform: translateX(0);
}

.nav-container input[type='checkbox'].hamburger-checkbox:checked ~ .hamburger-lines .line1 {
    transform: rotate(45deg);
}

.nav-container input[type='checkbox'].hamburger-checkbox:checked ~ .hamburger-lines .line2 {
    transform: scaleY(0);
}

.nav-container input[type='checkbox'].hamburger-checkbox:checked ~ .hamburger-lines .line3 {
    transform: rotate(-45deg);
}

.main {
    width: 100%;
    z-index: 1;
    background-color: var(--bg-color-primary);
}

.menu {
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    width: 0px;
    z-index: -1;
}
.menu-items {
    width: 290px;
    border-right: 1px solid var(--border-color-primary);
    position: sticky;
    top: 56px;
}

.body {
    display: flex;
    margin: 0 auto;
    max-width: 1360px;
    transition: max-width 0.3s ease-in-out;
}

.app:has(input[type='checkbox'].hamburger-checkbox:checked) {
    .body {
        .menu {
            transform: translateX(0);
            transition: transform 0.3s ease-in-out;
            transition: width 0.3s ease-in-out;
            width: 300px;
            z-index: 1;
        }
    }

    .navbar .container {
        transition: max-width 0.3s ease-in-out;
    }
}

.app:has(input[type='checkbox'].hamburger-checkbox:not(:checked)) {
    .menu {
        transition: all 0.3s ease-in-out;
    }

    .body {
        max-width: 1080px;
    }

    .navbar .container {
        max-width: 1080px;
        transition: max-width 0.3s ease-in-out;
    }
}

.navbar-avatar {
    position: relative;
}

@media (max-width: 768px) {
    .menu {
        position: fixed;
        top: 0;
        left: -100%;
        z-index: 10 !important;
        max-width: 90vw;
        transition: all 0.3s ease-in-out;
        height: 100vh;
    }
    .app:has(input[type='checkbox'].hamburger-checkbox:checked) {
        .menu {
            left: 0;
        }
    }
    .menu-items {
        border: none;
        background-color: var(--bg-color-primary);
        box-shadow: 0px 0 30px -2px var(--shadow-color-primary);
    }
}

@media (max-width: 400px) {
    .info {
        display: none;
    }
}
</style>
