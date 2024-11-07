<template>
    <div class="dialog" v-if="canShow" @click.self="canShow = false">
        <div class="content text-base">
            <h2 class="pb-[30px] font-bold text-xl">Login</h2>
            <div class="space-y-4">
                <CInput
                    v-model="loginData.username"
                    :errors="loginErrors?.username"
                    placeholder="Username"
                ></CInput>
                <CPassword
                    classes="!mt-[15px]"
                    v-model="loginData.password"
                    :errors="loginErrors?.password"
                    placeholder="Enter password"
                ></CPassword>
                <CCheckBox v-model="loginData.remember" name="remember_me" label="Remember me ?"></CCheckBox>

                <div class="flex items-center justify-between">
                    <div class="ml-auto">
                        <a href="#" class="text-purple-700 hover:text-purple-600 select-none">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <CButton
                    text="Sign in"
                    classes="w-full"
                    @clickCButton="login(loginData)"
                ></CButton>
                <div class="flex items-center justify-center space-x-2 my-5">
                    <span class="h-px w-16 bg-gray-100"></span>
                    <span class="font-normal">or</span>
                    <span class="h-px w-16 bg-gray-100"></span>
                </div>
                <div class="flex justify-center gap-5 w-full">
                    <GoogleSignIn
                        class="w-full h-[40px] flex items-center justify-center"
                    ></GoogleSignIn>
                    <!-- <GithubSignIn></GithubSignIn> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import type { Account, AccountError } from '@/types/TUser'
import LocalStorageService from '@/services/LocalStorageService'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useAuthStore } from '@/stores/auth'
import Api from '@/network/Api'
import { deviceTokenService } from '@/services/DeviceTokenService'
import GoogleSignIn from './GoogleSignIn.vue'
import { storeToRefs } from 'pinia'
import CPassword from '@/components/General/CPassword.vue'
// import GithubSignIn from './GithubSignIn.vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

library.add({ faEye, faEyeSlash })
const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const emit = defineEmits(['update:modelValue'])
const { saveFCMToken } = deviceTokenService()
const canShow = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
    }
})

watch(isAuthenticated, (newVal, oldVal) => {
    if (newVal) {
        canShow.value = false
    }
})

const loginData = ref<Account>({
    username: '',
    password: '',
    remember: false
})

const loginErrors = ref<AccountError>({
    username: [],
    password: []
})

const passwordVisibility = ref(false)

const login = async (payload: any) => {
    await Api.auth
        .login(payload)
        .then((res: any) => {
            LocalStorageService.saveAuthInfo(res.data)
            authStore.setAuthenticated(true)
            authStore.setProfile(res.data.user)
            canShow.value = false
            loginErrors.value = {} as AccountError
            saveFCMToken()
        })
        .catch((err: any) => {
            if (err?.status == 422) {
                loginErrors.value = err.data
            } else if (err?.status == 401) {
                loginErrors.value.password = [err.message]
            }
            LocalStorageService.clearAuthInfo()
        })
}

</script>
<style lang="scss" scoped>
.dialog {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--shadow-color-primary);
    z-index: 10;

    .content {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 400px;
        z-index: 11;
        opacity: 1;
        transform: translate(-50%, -50%);
        background: var(--bg-color-primary);
        padding: 30px;
        border-radius: 10px;
    }
}
</style>
