<template>
  <div
    class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"
  >
    <div class="flex justify-center self-center z-10 pt-[10%]">
      <div class="p-12 bg-white mx-auto rounded-3xl w-96 px-auto">
        <div class="mb-7">
          <h3 class="font-semibold text-2xl text-gray-800">Sign In</h3>
          <p class="text-gray-400">
            Don't have an account?
            <a
              href="#"
              @click.prevent="$router.push({ name: 'VRegister' })"
              class="text-sm text-purple-700 hover:text-purple-700"
              >Sign Up</a
            >
          </p>
        </div>
        <div class="space-y-4">
          <div class="">
            <CInput
              v-model="loginData.username"
              :errors="loginErrors?.username"
              placeholder="username"
            ></CInput>
          </div>
          <div class="relative">
            <CInput
              v-model="loginData.password"
              :errors="loginErrors?.password"
              placeholder="password"
              :type="passwordVisibility ? 'text' : 'password'"
            >
              <template v-slot:RIcon>
                <span
                  class="absolute top-1/2 -translate-y-1/2 right-2 text-[#9ca3af]"
                  @click.stop="togglePassword()"
                >
                  <FontAwesomeIcon v-show="passwordVisibility" :icon="['fas', 'eye']" />
                  <FontAwesomeIcon v-show="!passwordVisibility" :icon="['fas', 'eye-slash']" />
                </span>
              </template>
            </CInput>
          </div>
          <CCheckBox v-model="loginData.remember" label="Remember me ?"></CCheckBox>

          <div class="flex items-center justify-between">
            <div class="text-sm ml-auto">
              <a href="#" class="text-purple-700 hover:text-purple-600 select-none">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <CButton
              text="Sign in"
              classes="bg-purple-800 !text-gray-100 tracking-wide font-semibold"
              @clickCButton="login(loginData)"
            ></CButton>
          </div>
          <div class="flex items-center justify-center space-x-2 my-5">
            <span class="h-px w-16 bg-gray-100"></span>
            <span class="text-gray-300 font-normal">or</span>
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
        <div class="mt-7 text-center text-gray-300 text-xs">
          <span>
            Copyright © 2021-2023
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
    <footer class="bg-transparent absolute w-full bottom-0 left-0 z-30">
      <div class="container p-5 mx-auto flex items-center justify-between"></div>
    </footer>
  </div>
</template>

<script lang='ts'>
import { ref } from 'vue'
import AuthRepository from '@/repositories/AuthRepository'
import LocalStorageService from '@/services/LocalStorageService'
import CookieService from '@/services/CookieService'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

export default {
  name: 'VLogin',
  props: {},

  setup(props) {
    library.add({ faEye, faEyeSlash })

    const loginData = ref({
      username: '',
      password: '',
      remember: false as Boolean
    })
    const socialLoginUrls = ref({
      google: null,
      facebook: null
    })
    const loginErrors = ref({})
    const passwordVisibility = ref(false)

    return { loginData, loginErrors, socialLoginUrls, passwordVisibility }
  },

  mounted() {
    this.setLoginData()
    this.getUrlsGoogleSignIn()
  },

  methods: {
    togglePassword() {
      this.passwordVisibility = !this.passwordVisibility
    },
    login(payload: any) {
      AuthRepository.login(payload)
        .then((res: any) => {
          LocalStorageService.saveAuthInfo(res.data)
          if (this.loginData.remember) {
            CookieService.rememberMe(payload.username, payload.password)
          }
          this.loginErrors = {}
          this.$router.push({ name: 'VHome' })
        })
        .catch((err: any) => {
          if (err?.status == '422') {
            this.loginErrors = err.data
          }
          LocalStorageService.clearAuthInfo()
        })
    },
    getUrlsGoogleSignIn() {
      AuthRepository.getUrlsGoogleSignIn()
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
    }
  },

  watch: {},
  computed: {}
}
</script>
