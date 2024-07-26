<template>
    <div class="app" @scroll="onScroll()">
        <nav class="navbar" ref="navbarHeader">
            <div class="container nav-container">
                <input class="hamburger-checkbox" type="checkbox" v-model="visibleMenubar" />
                <div class="hamburger-lines">
                    <span class="line line1"></span>
                    <span class="line line2"></span>
                    <span class="line line3"></span>
                </div>
                <div class="navbar-right content-center">
                    <div v-if="!isLoggedIn">
                        <CButton
                            text="Sign in"
                            classes="w-18 h-8 p-3"
                            @click="visibleLogin = !visibleLogin"
                        ></CButton>
                    </div>
                    <div class="navbar-avatar" v-else>
                        <UDropdownMenu classes="dropdown"></UDropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
        <div class="body">
            <div class="menu">
                <div class="menu-items">
                    <UPanelMenu classes="test" />
                </div>
            </div>
            <div class="main p-3">
                <RouterView />
            </div>
        </div>

        <!-- List Dialog -->
        <UDialogLogin v-model="visibleLogin" />
        <CCloak v-model="visibleMenubar" v-if="widthIsMaxMD()"></CCloak>
    </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import LocalStorageService from '@/services/LocalStorageService'
import { ref } from 'vue'
import UPanelMenu from '../Units/UPanelMenu.vue'
import UDialogLogin from '../Units/UDialogLogin.vue'
import UDropdownMenu from '../Units/UDropdownMenu.vue'
import CCloak from '@/components/General/CCloak.vue'
import { useScreenSize } from '@/stores/ScreenSize'
import { storeToRefs } from 'pinia'
import Api from '@/network/Api'

export default {
    name: 'VHome',
    props: {},
    components: {
        CCloak,
        UPanelMenu,
        UDialogLogin,
        UDropdownMenu
    },

    setup(props) {
        const visibleLogin = ref(false)
        const visibleMenubar = ref(false)
        const screenSizeStore = useScreenSize()
        const { screenWidth } = storeToRefs(screenSizeStore)
        const { widthIsMaxMD } = screenSizeStore
        const isLoggedIn = LocalStorageService.isLoggedIn()
        const navbarHeader: any = ref(null)

        return {
            visibleLogin,
            visibleMenubar,
            screenWidth,
            screenSizeStore,
            widthIsMaxMD,
            isLoggedIn,
            navbarHeader
        }
    },

    methods: {
        async logout() {
            await Api.auth.logout().finally(() => {
                LocalStorageService.clearAuthInfo()
                this.$router.push({ name: 'VLogin' })
            })
        },
        onScroll() {
            var height = this.navbarHeader.value.scrollHeight
            if (height > 100) height = 100;
            this.navbarHeader.value.style.transform = `translateY(${-height}px)`
        }
    },

    watch: {}
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
    // width: 90%;
    margin: auto;
}

.navbar {
    width: 100%;
    box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: white;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 62px;
}

.nav-container {
    display: block;
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
    background: #979797;
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

.nav-container input[type='checkbox']:checked ~ .menu-items {
    transform: translateX(0);
}

.nav-container input[type='checkbox']:checked ~ .hamburger-lines .line1 {
    transform: rotate(45deg);
}

.nav-container input[type='checkbox']:checked ~ .hamburger-lines .line2 {
    transform: scaleY(0);
}

.nav-container input[type='checkbox']:checked ~ .hamburger-lines .line3 {
    transform: rotate(-45deg);
}

// menu
.main {
    // width: 1080px;
    width: 100%;
    // border: 1px solid black;
    z-index: 1;
    background-color: var(--background-color-1);
}

.menu {
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    width: 0px;
    z-index: -1;
}
.menu-items {
    width: 300px;
}

.body {
    display: flex;
    margin: 0 auto;
    max-width: 1360px;
    transition: max-width 0.3s ease-in-out;
    // border: 1px solid black;
    height: 100vh;
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
        background: var(--background-color-1);
        position: fixed;
        top: 0;
        left: -100%;
        z-index: 10 !important;
        max-width: 90vw;
        transition: all 0.3s ease-in-out;
        height: 100vh;
    }
    .app:has(input[type='checkbox']:checked) {
        .menu {
            left: 0;
        }
    }
}
</style>
