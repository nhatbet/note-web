import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      isAuthenticated: false,
      profile: {}
    }
  },

  getters: {},
  actions: {
    setIsAuthenticated(auth = true) {
      this.isAuthenticated = auth;
    },
    setProfile(profile = {}) {
      this.profile = profile
    }
  }
});
