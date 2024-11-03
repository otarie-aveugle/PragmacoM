<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      email: '',
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['recovery_password']),
    async submitForm() {
      this.errorMessage = ''
      if (this.isFormValid()) {
        await this.recovery_password(this.email)
        if (!this.errorMessage) {
          this.$router.push({ name: 'reset_link' })
        }
      } else {
        this.errorMessage =
          'Le formulaire est invalide. Veuillez vérifier vos informations.'
      }
    },
    isFormValid() {
      const regex =
        /^((?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/
      return regex.test(this.email)
    },
  },
}
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="my-8">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li class="step step-primary">Mot de passe oublié</li>
        <li class="step">Lien de réinitialisation</li>
        <li class="step">Réinitialisation du mot de passe</li>
        <li class="step">Mot de passe réinitialisé</li>
      </ul>
    </div>

    <form
      class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8"
      @submit.prevent="submitForm"
    >
      <p class="text-xl font-bold mb-6">Mot de passe oublié</p>

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

      <button type="submit" class="btn btn-primary">Suivant</button>

      <p v-if="errorMessage" class="text-red-500 text-md mt-2">
        {{ errorMessage }}
      </p>

      <div class="divider text-primary">
        <RouterLink to="/login">Se connecter</RouterLink>
      </div>
    </form>
  </div>
</template>

<style></style>
