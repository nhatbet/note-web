import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'

export const authService = () => {
    const authStore = useAuthStore()
    const { isAuthenticated } = storeToRefs(authStore)

    const checkShowLoginForm = () => {
        if (!isAuthenticated.value) {
            authStore.setShowLoginForm()
        }
    }

    return { checkShowLoginForm }
}
