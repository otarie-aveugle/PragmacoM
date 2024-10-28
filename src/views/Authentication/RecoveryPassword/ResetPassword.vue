<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'ResetPassword',
  data() {
    return {
      userId: this.$route.query.userId,
      secret: this.$route.query.secret,
      password: '',
      password_confirmation: '',
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useUserStore, ['confirm_recovery_password']),
    async submitForm() {
      this.errorMessage = ''
      if (this.isFormValid()) {
        await this.confirm_recovery_password(
          this.userId,
          this.secret,
          this.password,
          this.password_confirmation,
        )
        if (!this.errorMessage) {
          this.$router.push({ name: 'success_recover_password' })
        }
      } else {
        if (this.password !== this.password_confirmation) {
          this.errorMessage = 'Les mots de passe ne sont pas identiques.'
        } else if (
          !this.validPassword(this.password) ||
          !this.validPassword(this.password_confirmation)
        ) {
          this.errorMessage =
            'Le mot de passe doit contenir entre 8 et 256 caractères.'
        } else {
          this.errorMessage =
            'Le formulaire est invalide. Veuillez vérifier vos informations.'
        }
      }
    },
    isFormValid() {
      return (
        this.validPassword(this.password) &&
        this.validPassword(this.password_confirmation) &&
        this.password === this.password_confirmation
      )
    },
    validPassword(password) {
      const regex = /^(?=.{8,256}$).*$/
      return regex.test(password)
    },
  },
}
</script>

<template>
  <div class="my-8">
    <ul class="steps steps-vertical lg:steps-horizontal">
      <li class="step step-primary">Mot de passe oublié</li>
      <li class="step step-primary">Lien de réinitialisation</li>
      <li class="step step-primary">Réinitialisation du mot de passe</li>
      <li class="step">Mot de passe réinitialisé</li>
    </ul>
  </div>

  <form
    class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8"
    @submit.prevent="submitForm"
  >
    <p class="text-lg font-bold">Réinitialisation du mot de passe</p>

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
        placeholder="Confirmation du mot de passe"
        v-model="password_confirmation"
        required
      />
    </label>

    <button type="submit" class="btn btn-primary">Suivant</button>

    <p v-if="errorMessage" class="text-red-500 text-md mt-2">
      {{ errorMessage }}
    </p>
  </form>
</template>

<style></style>
