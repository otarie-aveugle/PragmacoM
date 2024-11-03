<script>
export default {
  name: 'SuccessRecoveryPassword',
}
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="my-8">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li class="step step-primary">Mot de passe oublié</li>
        <li class="step step-primary">Lien de réinitialisation</li>
        <li class="step step-primary">Réinitialisation du mot de passe</li>
        <li class="step step-primary">Mot de passe réinitialisé</li>
      </ul>
    </div>

    <div class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8">
      <p class="text-xl font-bold mb-6">
        Le mot de passe a bien été réinitialisé
      </p>

      <RouterLink to="/login" class="btn btn-primary">Se connecter</RouterLink>
    </div>
  </div>
</template>

<style></style>
