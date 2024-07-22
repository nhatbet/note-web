<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const gotoHome = () => {
  router.push({ name: 'VHome'})
}

</script>

<template>
  <CButton text="Home" classes="!w-[100px] my-5" @clickCButton="gotoHome()"></CButton>
  <main>
    <TheWelcome />
  </main>
</template>
