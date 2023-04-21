import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

import authAPI from '../Services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    email: useStorage('email', null),
    token: useStorage('token', null)
  }),
  getters: {
    isLoggedIn() {
      return this.token !== null
    },
    getEmail() {
      return this.email
    },
    getToken() {
      return this.token
    }
  },
  actions: {
    login(email, token) {
      this.email = email,
      this.token = token
    },
    logout() {
      this.email = null
      this.token = null
    },
    async checkToken() {
      if (this.token === null) return false
      const response = await authAPI.getProfile(this.token)
      if (response.error) return false
      return true
    }
  }
})
