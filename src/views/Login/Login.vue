<template>
    <div class="dialog" v-if="canShow" @click.self="canShow = false">
        <div class="content text-base">
            <h2 class="text-lg pb-[20px]">Login</h2>
            <div class="space-y-4">
                <CInput
                    v-model="loginData.username"
                    :errors="loginErrors?.username"
                    placeholder="username"
                ></CInput>
                <CInput
                    v-model="loginData.password"
                    :errors="loginErrors?.password"
                    placeholder="password"
                    class="relative"
                    :type="passwordVisibility ? 'text' : 'password'"
                >
                    <template v-slot:RIcon>
                        <span
                            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 right-2 text-[#9ca3af]"
                            @click.stop="togglePassword()"
                        >
                            <FontAwesomeIcon v-show="passwordVisibility" :icon="['fas', 'eye']" />
                            <FontAwesomeIcon
                                v-show="!passwordVisibility"
                                :icon="['fas', 'eye-slash']"
                            />
                        </span>
                    </template>
                </CInput>
                <CCheckBox v-model="loginData.remember" label="Remember me ?"></CCheckBox>

                <div class="flex items-center justify-between">
                    <div class="ml-auto">
                        <a href="#" class="text-purple-700 hover:text-purple-600 select-none">
                            Forgot your password?
                        </a>
                    </div>
                </div>
                <CButton
                    text="Sign in"
                    classes="bg-purple-800 !text-gray-100 tracking-wide font-semibold"
                    @clickCButton="login(loginData)"
                ></CButton>
                <div class="flex items-center justify-center space-x-2 my-5">
                    <span class="h-px w-16 bg-gray-100"></span>
                    <span class="font-normal">or</span>
                    <span class="h-px w-16 bg-gray-100"></span>
                </div>
                <div class="flex justify-center gap-5 w-full">
                    <CButton
                        text="Google"
                        icon="logo-google"
                        classes="transition ease-in duration-200 hover:border-gray-900 hover:bg-gray-900"
                        @clickCButton="loginWithGoogle()"
                    ></CButton>
                    <CButton
                        text="Facebook"
                        classes="transition ease-in duration-200 hover:border-gray-900 hover:bg-gray-900"
                    ></CButton>
                </div>
            </div>
            <div class="mt-7 text-center text-xs">
                <span>
                    Copyright © 2021-2024
                    <a
                        href="https://codepen.io/uidesignhub"
                        rel=""
                        target="_blank"
                        title="Codepen aji"
                        class="text-purple-500 hover:text-purple-600"
                        >AJI</a
                    ></span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { Account, AccountError } from '@/types/TUser'
import LocalStorageService from '@/services/LocalStorageService'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useAuthStore } from '@/stores/auth'
import Api from '@/network/Api'
import hello from 'hellojs'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

hello.init(
    {
        google: import.meta.env.VITE_GOOGLE_CLIENT_ID
    },
    { redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI }
)

library.add({ faEye, faEyeSlash })
const authStore = useAuthStore()
const emit = defineEmits(['update:modelValue'])

const canShow = computed({
    get: () => props.modelValue,
    set: (value) => {
        emit('update:modelValue', value)
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

// Hàm xử lý đăng nhập với Google
const loginWithGoogle = () => {
    hello('google')
        .login({ scope: 'email' })
        .then((auth) => {
            // Lấy mã access token từ Google
            const accessToken = auth?.authResponse?.access_token

            // Sau đó, gửi mã access token đến backend API của bạn để xác thực
            sendTokenToBackend(accessToken)
        })
    // .catch((error: any) => {
    //     console.error('Login Failed:', error)
    // })
}

// Hàm gửi access token đến backend Laravel API
const sendTokenToBackend = async (accessToken: any) => {
    await Api.auth
        .loginWithGoogle({ access_token: accessToken })
        .then((res: any) => {
            LocalStorageService.saveAuthInfo(res.data)
            authStore.setAuthenticated(true)
            authStore.setProfile(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
}

const login = async (payload: any) => {
    await Api.auth
        .login(payload)
        .then((res: any) => {
            LocalStorageService.saveAuthInfo(res.data)
            authStore.setAuthenticated(true)
            authStore.setProfile(res.data)
            canShow.value = false
            loginErrors.value = {} as AccountError
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

const togglePassword = () => {
    passwordVisibility.value = !passwordVisibility.value
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
