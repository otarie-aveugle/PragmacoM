<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'EditPanelPage',
  data() {
    return {
      //TODO à supprimer et insérés les vrais données directement dans le template
      panel: {
        name: 'PANNEAU 1',
      },
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
        //TODO call méthods edit_panel from panelStore
        if (!this.errorMessage) {
          this.$router.push({ name: 'panels' })
        }
      } else {
        //TODO a supprimer une fois implémenté
        this.errorMessage =
          'Le formulaire est invalide. Veuillez vérifier vos informations.'
        // if (!this.) { //TODO effectuez les vérifications nécessaire d'inputs
        //   this.errorMessage = "" //indiquer les réponses en fonctions
        // } else {
        //   this.errorMessage =
        //     'Le formulaire est invalide. Veuillez vérifier vos informations.'
        // }
      }
    },
    isFormValid() {
      false
      //return if form is valid or not (true|false)
    },
  },
}
</script>

<template>
  <div class="text-center">
    <p class="text-2xl">Page de modification d'un panneau</p>
  </div>
  <form class="flex flex-col mx-auto items-center" @submit.prevent="submitForm">
    <div class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8">
      <p class="text-lg font-bold">Modification de {{ panel.name }}</p>

      <button type="submit" class="btn btn-primary">Modifier le panneau</button>

      <p v-if="errorMessage" class="text-red-500 text-md mt-2">
        {{ errorMessage }}
      </p>

      <div class="divider text-primary">
        <RouterLink to="/panels">Liste des panneaux</RouterLink>
      </div>
    </div>
  </form>
</template>

<style></style>
