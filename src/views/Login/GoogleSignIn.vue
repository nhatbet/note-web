<template>
    <CButton
        text="Google"
        icon="logo-google"
        classes="w-full"
        @clickCButton="loginWithProvider(provider)"
    ></CButton>
</template>

<script lang="ts" setup>
import { authService } from '@/services/AuthService'
import hello from 'hellojs'

hello.init(
    {
        google: import.meta.env.VITE_GOOGLE_CLIENT_ID
    },
    { redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI }
)

const provider = 'google'

const { loginWithProvider } = authService()
</script>

<style scoped lang="scss"></style>
