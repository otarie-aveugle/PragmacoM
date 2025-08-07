import { defineStore } from 'pinia'
import { account } from '@/lib/appwrite'
import fr from '@/locales/index'

const messages = fr.fr

export const useUserStore = defineStore('user', {
  state: () => ({
    userLoggedIn: localStorage.getItem('userLoggedIn') === 'true',
    errorMessage: '',
  }),
  actions: {
    async login(email, password) {
      try {
        await account.createEmailPasswordSession(email, password)
        this.userLoggedIn = true
        localStorage.setItem('userLoggedIn', true)
        this.errorMessage = ''
      } catch (error) {

        switch (error.message) {
          //TODO gérer les autres cas en suivants les taux de limites indiqués + ajouter le cas du taux de limite dépassé !
          //https://appwrite.io/docs/references/cloud/client-web/account#createEmailPasswordSession
          case 'Invalid credentials. Please check the email and password.':
            this.errorMessage = messages.login.failure.credentials
            break
          default:
            this.errorMessage = messages.login.failure.default
        }
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
