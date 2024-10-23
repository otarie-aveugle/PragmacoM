<script>
import { mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      email: '',
    }
  },
  methods: {
    ...mapActions(useUserStore, ['recovery_password']),
  },
}
</script>

<template>
  <div class="my-8">
    <ul class="steps steps-vertical lg:steps-horizontal">
      <li class="step step-primary">Mot de passe oublié</li>
      <li class="step">Lien de réinitialisation</li>
      <li class="step">Réinitialisation du mot de passe</li>
      <li class="step">Mot de passe réinitialisé</li>
    </ul>
  </div>

  <div class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8">
    <p class="text-lg font-bold">Mot de passe oublié</p>

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
        class="placeholder-base-content/70"
        placeholder="Email"
        v-model="email"
      />
    </label>

    <RouterLink
      to="/reset_link"
      class="btn btn-primary"
      @click="recovery_password(email)"
    >
      Suivant
    </RouterLink>

    <div class="divider text-primary">
      <RouterLink to="/login">Se connecter</RouterLink>
    </div>
  </div>
</template>

<style></style>
