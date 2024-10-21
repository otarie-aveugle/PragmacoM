import { defineStore } from 'pinia'
import { account } from '@/lib/appwrite'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: localStorage.getItem('userLoggedIn'),
  }),
  actions: {
    async login(email, password) {
      await account.createEmailPasswordSession(email, password)
      this.userLoggedIn = true
      localStorage.setItem('userLoggedIn', true)
    },
    async logout() {
      await account.deleteSession('current')
      this.userLoggedIn = false
      localStorage.removeItem('userLoggedIn')
    },
  },
})
