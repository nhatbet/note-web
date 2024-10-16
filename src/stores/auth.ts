import type { UserInfo } from '@/types/TUser'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    isShowLoginForm: false,
    profile: {} as UserInfo
  }),

  getters: {
    // doubleCount: (state) => state.counter * 2
  },

  actions: {
    setAuthenticated(auth = true) {
      this.isAuthenticated = auth
    },
    setShowLoginForm(auth = true) {
      this.isShowLoginForm = auth
    },
    setProfile(profile = {} as UserInfo) {
      this.profile = profile
    }
  }
})
