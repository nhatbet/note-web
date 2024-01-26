<template>
  <div class="">
    login success
    <CButton @clickCButton="logout()" text="Logout" classes="w-[100px]"></CButton>
  </div>
</template>

<script lang='ts'>
import LocalStorageService from '@/services/LocalStorageService'
import AuthRepository from '@/repositories/AuthRepository'

export default {
  name: 'Home',
  props: {},

  setup(props) {},

  methods: {
    logout() {
      AuthRepository.logout().finally(() => {
        LocalStorageService.clearAuthInfo();
        this.$router.push({ name: 'Login' })
      })
    }
  },

  watch: {},
  computed: {}
}
</script>
