import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import hello from 'hellojs'
import Api from '@/network/Api'
import LocalStorageService from './LocalStorageService'
import { deviceTokenService } from '@/services/DeviceTokenService'

export const authService = () => {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)
    const { saveFCMToken } = deviceTokenService()

    const checkShowLoginForm = () => {
        if (!isAuthenticated.value) {
            authStore.setShowLoginForm()
        }
    }

    // Hàm xử lý đăng nhập với Provider: Google, Github
    const loginWithProvider = (provider: string) => {
        hello(provider)
            .login({ scope: 'email' })
            .then((auth: any) => {
                // Lấy mã access token từ Google
                const accessToken = auth?.authResponse?.access_token
                // Gửi mã access token đến backend API của bạn để xác thực
                sendTokenToBackend(provider, accessToken)
            })
    }

    // Hàm gửi access token đến backend Laravel API
    const sendTokenToBackend = async (provider: string, accessToken: any) => {
        await Api.auth
            .loginWithProvider({ provider: provider, access_token: accessToken })
            .then((res: any) => {
                LocalStorageService.saveAuthInfo(res.data)
                authStore.setAuthenticated(true)
                authStore.setProfile(res.data)
                saveFCMToken()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return { checkShowLoginForm, loginWithProvider }
}
