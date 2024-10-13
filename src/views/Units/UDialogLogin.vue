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
                        :href="socialLoginUrls.google"
                        v-show="socialLoginUrls.google"
                    ></CButton>
                    <CButton
                        text="Facebook"
                        classes="transition ease-in duration-200 hover:border-gray-900 hover:bg-gray-900"
                        :href="socialLoginUrls.facebook"
                        v-show="socialLoginUrls.facebook"
                    ></CButton>
                </div>
            </div>
            <div @click="loginWithProvider('google')">login with gg</div>
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

<script lang="ts">
import { computed, ref } from 'vue'
import type { Account, AccountError } from '@/types/TUser'
import LocalStorageService from '@/services/LocalStorageService'
import CookieService from '@/services/CookieService'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useAuthStore } from '@/stores/auth'
import BaseApi from '@/network/BaseApi'
import Api from '@/network/Api'
import HelloJs from 'hellojs'

HelloJs.init(
    {
        google: '652408377462-4m5i90dnr81rla395gkjdlp1uvv7g9la.apps.googleusercontent.com'
    },
    { redirect_uri: 'http://localhost:80/api/login/google/callback' }
)

// hello.on('auth.login', function(auth: any) {
//   console.log(auth)

// });

export default {
    name: 'UDialogLogin',
    props: {
        modelValue: {
            type: Boolean,
            default: false
        }
    },
    components: {},
    setup(props, { emit }) {
        library.add({ faEye, faEyeSlash })
        const authStore = useAuthStore()
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

        const socialLoginUrls = ref({
            google: null,
            facebook: null
        })

        const passwordVisibility = ref(false)

        return { canShow, loginData, socialLoginUrls, loginErrors, passwordVisibility, authStore }
    },
    methods: {
        togglePassword() {
            this.passwordVisibility = !this.passwordVisibility
        },
        login(payload: any) {
            Api.auth
                .login(payload)
                .then((res: any) => {
                    LocalStorageService.saveAuthInfo(res.data)
                    this.authStore.setIsAuthenticated(true)
                    this.authStore.setProfile(res.data)

                    if (this.loginData.remember) {
                        CookieService.rememberMe(payload.username, payload.password)
                    }
                    this.canShow = false
                    this.loginErrors = {} as AccountError
                })
                .catch((err: any) => {
                    if (err?.status == 422) {
                        this.loginErrors = err.data
                    } else if (err?.status == 401) {
                        this.loginErrors.password = [err.message]
                    }
                    LocalStorageService.clearAuthInfo()
                })
        },
        getUrlsGoogleSignIn() {
            BaseApi.get('url-sign-in/google')
                .then((res: any) => {
                    this.socialLoginUrls.google = res.data.url
                })
                .catch((err: any) => {
                    this.socialLoginUrls.google = null
                })
        },
        setLoginData() {
            const account = CookieService.getRememberMe()
            if (account.username) {
                this.loginData.username = account.username
            }
            if (account.password) {
                this.loginData.password = account.password
            }
        },
        loginWithProvider(network: string) {
            HelloJs.login(network).then(
                () => {
                    console.log('callback')

                    const authRes = HelloJs(network).getAuthResponse()
                    // BaseApi.get(`login/${this.$route.params.provider}/callback`, {
                    //     params: {
                    //         access_token: authRes.access_token,
                    //         provider: network
                    //     }
                    // })
                    //     .then((res: any) => {
                    //         LocalStorageService.saveAuthInfo(res.data)
                    //         this.$router.push({ name: 'VHome' })
                    //     })
                    //     .catch((err: any) => {
                    //         this.$router.push({ name: 'VLogin' })
                    //     })
                },
                (e: any) => {
                    console.log(e)
                }
            )
        }
    }
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
