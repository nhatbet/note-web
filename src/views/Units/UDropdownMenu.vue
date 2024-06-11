<template>
    <div class="dropdown-menu z-10 w-[43px]">
        <ul class="pt-2 relative">
            <li class="menu-icon h-[43px] cursor-pointer content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base"><FontAwesomeIcon :icon="['fas', 'bell']" /></span>
                    <input
                    checked
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content1</div>
            </li>
            <li class="menu-icon h-[43px] cursor-pointer content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base"><FontAwesomeIcon :icon="['fas', 'reply']" /></span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content2</div>
            </li>
            <li class="menu-icon h-[43px] cursor-pointer content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base"><FontAwesomeIcon :icon="['fas', 'bookmark']" /></span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content3</div>
            </li>
            <li class="menu-icon h-[43px] cursor-pointer content-center text-center">
                <div class="relative h-full content-center">
                    <span>icon</span>
                    <input
                        type="radio"
                        class="opacity-0 absolute top-0 left-0 w-full h-full"
                        name="dropdown_menu"
                    />
                </div>
                <div class="dropdown-content absolute top-[-1px] right-full hidden">content4</div>
            </li>
            <li class="menu-icon h-[43px] cursor-pointer content-center text-center">
                <div class="relative h-full content-center">
                    <span class="text-zinc-400 text-base"><FontAwesomeIcon :icon="['fas', 'user']" /></span>
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
</template>

<script lang='ts'>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faBell, faBookmark, faReply } from '@fortawesome/free-solid-svg-icons'

export default {
    name: 'CInput',
    props: {},
    components: {},
    setup(props, { emit }) {
        library.add({ faUser, faBell, faBookmark, faReply })

        return {}
    },

    methods: {}
}
</script>

<style scoped lang='scss'>
.dropdown-menu {
    ul {
        border: 1px solid rgb(209, 209, 209);
    }
}
.menu-icon:hover {
    background-color: rgb(231, 231, 231);
    transition: background-color 0.4s ease-in-out;
}
.menu-icon:has(input[type='radio']:checked) {
    background-color: rgb(231, 231, 231);
    transition: background-color 0.4s ease-in-out;
    div {
        display: block;
    }
}
.dropdown-content {
    width: 320px;
    border: 1px solid rgb(209, 209, 209);
    min-height: calc(100% + 2px);
}

@media (max-width: 768px) {
    .dropdown-menu {
        background: white;
        height: 100vh;
        position: fixed !important;
        top: 0;
        right: 0;
        z-index: 11 !important;
        ul {
            border-bottom: none;
            border-right: none;
        }
        .dropdown-content {
            height: 100vh;
            background: white;
        }
    }
}
</style>
