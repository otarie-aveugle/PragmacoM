<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['login']),
    async submitForm() {
      this.errorMessage = ''
      if (this.isFormValid()) {
        await this.login(this.email, this.password)
        if (!this.errorMessage) {
          this.$router.push({ name: 'home' })
        }
      } else {
        if (!this.validEmail(this.email)) {
          this.errorMessage = "L'adresse email est invalide."
        } else {
          this.errorMessage =
            'Le formulaire est invalide. Veuillez vérifier vos informations.'
        }
      }
    },
    isFormValid() {
      return this.validEmail(this.email) && this.password.length > 0
    },
    validEmail(email) {
      const regex =
        /^((?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/
      return regex.test(email)
    },
  },
}
</script>

<template>
  <div class="flex-grow">
    <form
      class="flex flex-col mx-auto items-center"
      @submit.prevent="submitForm"
    >
      <div class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8">
        <p class="text-xl font-bold mb-6">Se connecter</p>

        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
            />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
            />
          </svg>
          <input
            type="email"
            class="placeholder-base-content/70 w-full"
            placeholder="Email"
            v-model="email"
            required
          />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70"
          >
            <path
              fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd"
            />
          </svg>
          <input
            type="password"
            class="placeholder-base-content/70 w-full"
            placeholder="Mot de passe"
            v-model="password"
            required
          />
        </label>

        <button type="submit" class="btn btn-primary">Se connecter</button>

        <p v-if="errorMessage" class="text-red-500 text-md mt-2">
          {{ errorMessage }}
        </p>

        <div class="divider text-primary">
          <RouterLink to="/recovery_password">Mot de passe oublié</RouterLink>
        </div>
      </div>
    </form>
  </div>
</template>

<style></style>
