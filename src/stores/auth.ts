import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    profile: {}
  }),

  getters: {
    // doubleCount: (state) => state.counter * 2
  },

  actions: {
    setIsAuthenticated(auth = true) {
      this.isAuthenticated = auth
    },
    setProfile(profile = {}) {
      this.profile = profile
    }
  }
})
