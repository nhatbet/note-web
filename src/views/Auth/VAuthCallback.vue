<template>
  <div
    class="bg-purple-900 absolute top-0 left-0 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 bottom-0 leading-5 h-full w-full overflow-hidden"
  >
    callback
  </div>
</template>

<script lang='ts'>
import BaseApi from '@/network/BaseApi';
import LocalStorageService from '@/services/LocalStorageService'

export default {
  name: 'VAuthCallback',
  props: {},

  setup(props) {},

  mounted() {
    this.loginWithGoogle()
  },

  methods: {
    loginWithGoogle() {
      BaseApi.get(`login/${this.$route.params.provider}/callback`, this.$route.query)
        .then((res: any) => {
          LocalStorageService.saveAuthInfo(res.data)
          this.$router.push({ name: 'VHome' })
        })
        .catch((err: any) => {
          this.$router.push({ name: 'VLogin' })
        })
    }
  }
}
</script>
