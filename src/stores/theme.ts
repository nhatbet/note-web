import { defineStore } from 'pinia'
import { ref } from 'vue'
import LocalStorageService from '@/services/LocalStorageService'

export const useThemeStore = defineStore('theme', () => {
    const activeTheme = ref('light')

    const getTheme = () => {
        return LocalStorageService.getTheme()
    }

    const setTheme = (theme: string) => {
        activeTheme.value = theme
        LocalStorageService.setTheme(theme)
        // set them for all element
        document.documentElement.className = theme
    }

    const getMediaPreference = () => {
        const hasDarkPreference = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (hasDarkPreference) {
            return 'dark'
        } else {
            return 'light'
        }
    }

    const toggleTheme = () => {
        if (activeTheme.value === 'light') {
            setTheme('dark')
        } else {
            setTheme('light')
        }
    }

    const initUserTheme = getTheme() || getMediaPreference()
    setTheme(initUserTheme)

    return { setTheme, activeTheme, toggleTheme }
})
