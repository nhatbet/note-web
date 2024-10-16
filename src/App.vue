<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { getFCMToken, messaging } from './firebase'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import Api from './network/Api'
import { onMessage } from 'firebase/messaging'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
const toastMessage = ref('')
onMounted(async () => {
    if (isAuthenticated.value) {
        const token = await getFCMToken()
        if (token) {
            // Gửi token này đến API của Laravel để lưu trữ
            await Api.deviceToken
                .store({ token: token })
                .then((res: any) => {
                    console.log('save token: ', res)
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
    }
})

onMessage(messaging, (payload: any) => {
    console.log('Thông báo nhận được:', payload)
    toastMessage.value = `${payload.notification.title} - ${payload.notification.body}`
    toast.success(toastMessage.value)
})

</script>

<template>

    <RouterView />

</template>

<style scoped>
/* header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
