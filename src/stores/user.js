import { defineStore } from 'pinia'
import { account } from '@/lib/appwrite'

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: localStorage.getItem('userLoggedIn') === 'true',
    errorMessage: '',
    //TODO gérer errorMessage pour ne pas afficher le 'Invalid `password` param:', on utilisera vue-i18n pour les messages
  }),
  actions: {
    async login(email, password) {
      try {
        await account.createEmailPasswordSession(email, password)
        this.userLoggedIn = true
        localStorage.setItem('userLoggedIn', true)
        this.errorMessage = ''
      } catch (error) {
        console.error('Login error:', error)
        this.errorMessage = error.message
      }
    },
    async logout() {
      try {
        await account.deleteSession('current')
        this.userLoggedIn = false
        localStorage.removeItem('userLoggedIn')
        this.errorMessage = ''
      } catch (error) {
        console.error('Logout error:', error)
        this.errorMessage = error.message
      }
    },
    async recovery_password(email) {
      try {
        await account.createRecovery(
          email,
          'http://localhost:5173/reset_password/',
        )
        this.errorMessage = ''
      } catch (error) {
        console.error('Recovery error:', error)
        this.errorMessage = error.message
      }
    },
    async confirm_recovery_password(
      userID,
      secret,
      password,
      password_confirmation,
    ) {
      try {
        await account.updateRecovery(
          userID,
          secret,
          password,
          password_confirmation,
        )
        this.errorMessage = ''
      } catch (error) {
        console.error('Confirm recovery error:', error)
        this.errorMessage = error.message
      }
    },
  },
})
