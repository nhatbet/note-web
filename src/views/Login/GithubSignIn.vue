<template>
    <CButton
        text="Github"
        icon="logo-github"
        classes="transition ease-in duration-200 hover:border-gray-900 hover:bg-gray-900"
        @clickCButton="loginWithProvider(provider)"
    ></CButton>
</template>

<script lang="ts" setup>
import { authService } from '@/services/AuthService'
import hello from 'hellojs'

hello.init(
    {
        github: import.meta.env.VITE_GITHUB_CLIENT_ID
    },
    { redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI }
)

const provider = 'github'

const { loginWithProvider } = authService()
</script>

<style scoped lang="scss"></style>
