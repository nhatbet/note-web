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
            <a href="#" class="text-sm text-purple-700 hover:text-purple-700">Sign Up</a>
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
              type="password"
            ></CInput>
          </div>

          <div class="flex items-center justify-between">
            <div class="text-sm ml-auto">
              <a href="#" class="text-purple-700 hover:text-purple-600"> Forgot your password? </a>
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

export default {
  name: 'Login',
  props: {},

  setup(props) {
    const loginData = ref({
      username: '',
      password: ''
    })
    const socialLoginUrls = ref({
      google: null,
      facebook: null
    })
    const loginErrors = ref({})

    return { loginData, loginErrors, socialLoginUrls }
  },

  mounted() {
    this.getUrlsGoogleSignIn()
  },

  methods: {
    login(payload: any) {
      AuthRepository.login(payload)
        .then((res: any) => {
          LocalStorageService.saveAuthInfo(res.data)
          this.loginErrors = {}
          this.$router.push({ name: 'Home' })
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
    }
  },

  watch: {},
  computed: {}
}
</script>
