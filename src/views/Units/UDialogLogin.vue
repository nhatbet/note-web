<template>
  <div>
    <Dialog v-model:visible="canShow" modal header="Login" :style="{ width: '25rem' }">
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
    </Dialog>
  </div>
</template>

<script lang='ts'>
import Dialog from 'primevue/dialog'
import CButton from '../../components/General/CButton.vue'
import { computed, ref } from 'vue'
import type { Account, AccountError } from '@/types/TUser'
import AuthRepository from '@/repositories/AuthRepository'
import LocalStorageService from '@/services/LocalStorageService'
import CookieService from '@/services/CookieService'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'UDialogLogin',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Dialog,
    CButton
  },
  setup(props, { emit }) {
    library.add({ faEye, faEyeSlash })
    const authStore = useAuthStore();
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
      AuthRepository.login(payload)
        .then((res: any) => {
          LocalStorageService.saveAuthInfo(res.data)
          this.authStore.setIsAuthenticated(true)
          this.authStore.setProfile(res.data)
          
          if (this.loginData.remember) {
            CookieService.rememberMe(payload.username, payload.password)
          }
          this.loginErrors = {} as AccountError
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
  }
}
</script>
