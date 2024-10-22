<script>
// import ForgotPasswordPage from '@/Authentication/RecoveryPassword/ForgotPasswordPage.vue'

export default {
  name: 'RecoveryPasswordPage',
  //   components: {
  //     ForgotPasswordPage,
  //   }
}
</script>

<template>
  <div class="flex flex-col mx-auto items-center">
    <div class="my-8">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li class="step step-primary">Mot de passe oublié</li>
        <li class="step step-primary">Envoie du code</li>
        <li class="step">Réinitialisation du mot de passe</li>
        <li class="step">Confirmation</li>
        <li class="step">Nouveau mot de passe</li>
      </ul>
    </div>

    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<style></style>
