<script>
export default {
  name: 'ResetLink',
}
</script>

<template>
  <div class="flex flex-col items-center gap-6">
    <div class="my-8">
      <ul class="steps steps-vertical lg:steps-horizontal">
        <li class="step step-primary">Mot de passe oublié</li>
        <li class="step step-primary">Lien de réinitialisation</li>
        <li class="step">Réinitialisation du mot de passe</li>
      </ul>
    </div>

    <div class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8">
      <p class="text-xl font-bold mb-6">Vérifier vos e-mails</p>

      <p>
        Cliquer sur le lien dans l'e-mail pour créer un nouveau mot de passe.
      </p>
    </div>
  </div>
</template>

<style></style>
