<template>
    <div
        class="w-[43px] h-[43px] content-center text-center cursor-pointer border-solid border-t border-r border-l border-transparent"
        :class="{ '!border-slate-300': isShowMenu }"
        @click="isShowMenu = !isShowMenu"
    >
        <img
            src="https://picsum.photos/300/300"
            class="w-[30px] h-[30px] m-auto rounded-full"
            alt="avatar"
        />
    </div>
    <div class="dropdown-menu w-[43px]" :class="{ 'hidden-dropdown-menu': !isShowMenu }">
        <ul class="pt-2 relative">
            <li class="menu-icon h-[43px] content-center text-center">
                <div class="relative h-full content-center">
                    <div class="text-zinc-400 text-base cursor-pointer relative">
                        <FontAwesomeIcon :icon="['fas', 'bell']" />
                        <span
                            class="badge absolute w-[15px] h-[15px] top-[0px] right-[3px] rounded-full bg-lime-300 text-white text-xs content-center"
                            >1
                        </span>
                    </div>
                    <input
                        checked
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content1</div>
            </li>
            <li class="menu-icon h-[43px] content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base cursor-pointer">
                        <FontAwesomeIcon :icon="['fas', 'reply']"
                    /></span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content2</div>
            </li>
            <li class="menu-icon h-[43px] content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base cursor-pointer"
                        ><FontAwesomeIcon :icon="['fas', 'bookmark']"
                    /></span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content3</div>
            </li>
            <li class="menu-icon h-[43px] content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base cursor-pointer"
                        ><FontAwesomeIcon :icon="['fas', 'comment']"
                    /></span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content4</div>
            </li>
            <li class="menu-icon h-[43px] content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base cursor-pointer"
                        ><FontAwesomeIcon :icon="['fas', 'user']"
                    /></span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content5</div>
            </li>
        </ul>
    </div>
    <CCloak v-model="isShowMenu"></CCloak>
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faBell, faBookmark, faReply, faComment } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { useWindowSize } from 'vue-window-size'
import CCloak from '@/components/General/CCloak.vue'

export default {
    name: 'CInput',
    props: {},
    components: {
        CCloak
    },
    setup(props, { emit }) {
        library.add({ faUser, faBell, faBookmark, faReply, faComment })
        const isShowMenu = ref(false)
        const { width, height } = useWindowSize()

        return { isShowMenu, width }
    },

    methods: {}
}
</script>

<style scoped lang="scss">
.dropdown-menu {
    position: absolute;
    z-index: 10;
    background: var(--background-color-1);
    ul {
        border: 1px solid rgb(209, 209, 209);
        .dropdown-content {
            min-width: 300px;
            max-width: 100vh;
            border: 1px solid rgb(209, 209, 209);
            min-height: calc(100% + 2px);
            background: var(--background-color-1);
        }
    }
}
.menu-icon:hover {
    background-color: rgb(231, 231, 231);
    transition: background-color 0.2s ease-in-out;
}
.menu-icon:has(input[type='radio']:checked) {
    background-color: rgb(231, 231, 231);
    transition: background-color 0.2s ease-in-out;
    div {
        display: block;
    }
}
@media (min-width: 768px) {
    .hidden-dropdown-menu {
        display: none;
    }
}
@media (max-width: 768px) {
    .dropdown-menu {
        height: 100vh;
        position: fixed !important;
        top: 0;
        right: 0;
        ul {
            border-bottom: none;
            border-right: none;
        }
        .dropdown-content {
            height: 100vh;
        }
        transition: all 0.3s ease-in-out;
    }
    .hidden-dropdown-menu {
        right: -100%;
        opacity: 0;
    }
}
</style>
