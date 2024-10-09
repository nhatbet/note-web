import type { UserInfo } from '@/types/TUser'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    profile: {} as UserInfo
  }),

  getters: {
    // doubleCount: (state) => state.counter * 2
  },

  actions: {
    setIsAuthenticated(auth = true) {
      this.isAuthenticated = auth
    },
    setProfile(profile = {} as UserInfo) {
      this.profile = profile
    }
  }
})
