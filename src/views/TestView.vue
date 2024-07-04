<template>
    <main class="flex justify-center">
        <!-- <div class="w-[100px]">
            <CButton text="Login" classes="w-[100px] my-5" href="/login"></CButton>
            <CButton text="signup" classes="w-[100px] my-5" href="/login?page=signup"></CButton>
            <CButton
                text="confirm signup"
                classes="w-[150px] my-5"
                href="/login?page=confirmsignup"
            ></CButton>
        </div> -->
        <div class="text-lg">
            <div v-if="user">
                <p>user:</p>
                <p class="ml-5">
                    {{ user.username }} <br />
                {{ user.email_verified }}
                </p>
            </div>
            <div v-if="steps">
                <p>steps:</p>
                <p class="ml-5" v-for="(step, index) in steps" :key="index">
                   {{ index+1 }}: date-{{ step.date }}   point-{{ step.point }}
                </p>
            </div>
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
        // const listStep = {
        //     user: {
        //         username: 'example_user',
        //         email_verified: true
        //     },
        //     steps: [
        //         {
        //             date: '2023-10-01',
        //             point: 12000
        //         },
        //         {
        //             date: '2023-10-02',
        //             point: 15000
        //         }
        //     ]
        // }
        // const cookieData = JSON.stringify(listStep)
        // cookies.set('STEP-COUNT-INFORMATION', cookieData)

        const stepCountInfo = cookies.get('STEP-COUNT-INFORMATION');

        const user = stepCountInfo.user
        const steps = stepCountInfo.steps

        // const test = cookies.get('test')
        // const local_storage = localStorage.getItem('local_storage')
        // const session_storage = sessionStorage.getItem('session_storage')
        // const count_session = sessionStorage.length

        // return { test, local_storage, session_storage, count_session }
        return { user, steps }
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
