<template>
  <div
    class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"
  >
    <div class="flex justify-center self-center z-10 pt-[10%]">
      <div class="p-12 bg-white mx-auto rounded-3xl w-96 px-auto">
        <div class="mb-7">
          <h3 class="font-semibold text-2xl text-gray-800">Sign Up</h3>
          <p class="text-gray-400">
            Do have an account?
            <a href="#" @click.prevent="$router.push({ name: 'VLogin' })" class="text-sm text-purple-700 hover:text-purple-700">Sign In</a>
          </p>
        </div>
        <div class="space-y-4">
          <div class="">
            <CInput
              v-model="registerData.email"
              :errors="registerErrors?.email"
              placeholder="email"
            ></CInput>
          </div>
          <div class="relative">
            <CInput
              v-model="registerData.name"
              :errors="registerErrors?.name"
              placeholder="name"
            ></CInput>
          </div>
          <div class="relative">
            <CInput
              v-model="registerData.username"
              :errors="registerErrors?.username"
              placeholder="username"
            ></CInput>
          </div>
          <div class="relative">
            <CInput
              v-model="registerData.password"
              :errors="registerErrors?.password"
              placeholder="password"
              type="password"
            ></CInput>
          </div>
          <div class="relative">
            <CInput
              v-model="registerData.password_confirmation"
              :errors="registerErrors?.password_confirmation"
              placeholder="password confirmation"
              type="password"
            ></CInput>
          </div>

          <div>
            <CButton
              text="Sign up"
              classes="bg-purple-800 !text-gray-100 tracking-wide font-semibold"
              @clickCButton="register(registerData)"
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
import type { AccountRegister, AccountRegisterError } from '@/types/TUser'

export default {
  name: 'VRegister',
  props: {},

  setup(props) {
    const registerData = ref<AccountRegister>({
      email: '',
      name: '',
      username: '',
      password: '',
      password_confirmation: ''
    })
    const registerErrors = ref<AccountRegisterError>({
      email: [],
      name: [],
      username: [],
      password: [],
      password_confirmation: [],
    })

    return { registerData, registerErrors }
  },

  mounted() {},

  methods: {
    register(payload: any) {
      AuthRepository.register(payload)
        .then((res: any) => {
          this.registerErrors = {} as AccountRegisterError;
          this.$notify({
            group: "success",
            title: "success",
            text: res.message
          }, 4000)
          this.$router.push({ name: 'VLogin' })
        })
        .catch((err: any) => {
          if (err?.status == '422') {
            this.registerErrors = err.data
          }
        })
    }
  },

  watch: {},
  computed: {}
}
</script>
