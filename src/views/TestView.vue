<template>
    <main class="flex justify-center">
        <div class="w-[100px]">
            <CButton text="Login" classes="w-[100px] my-5" href="/login"></CButton>
            <CButton text="signup" classes="w-[100px] my-5" href="/login?page=signup"></CButton>
            <CButton
                text="confirm signup"
                classes="w-[150px] my-5"
                href="/login?page=confirmsignup"
            ></CButton>
        </div>
    </main>
</template>
<script lang='ts'>
import { ref } from 'vue'
import { useCookies } from 'vue3-cookies'
export default {
    name: 'CCloak',
    props: {},
    setup(props, { emit }) {
        const { cookies } = useCookies()

        const test = cookies.get('test')
        const local_storage = localStorage.getItem('local_storage')
        const session_storage = sessionStorage.getItem('session_storage')
        const count_session = sessionStorage.length

        return { test, local_storage, session_storage, count_session }
    },
    methods: {
        gotoLogin() {
            this.$router.push({ path: '/login/' })
        }
        // gotoSignup() {
        //     // this.$router.push({ name: 'VLogin', params: { page: 'signup' } })
        //     this.$router.push({ path: '/login?page=signup' })
        // },
        // gotoConfirmSignup() {
        //     // this.$router.push({ name: 'VLogin', params: { page: 'confirmsignup' } })
        //     this.$router.push({ path: '/login?page=confirmsignup' })
        // }
    }
}
</script>
