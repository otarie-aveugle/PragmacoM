<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'EditPanelPage',
  data() {
    return {
      disponibility: false,
      disponibility_date: '2024-10-29', //TODO mettre la date du jour dynamiquement
      adresse: '',
      town: '',
      postal_code: '',
      position: 'BR Gauche',
      format: '',
      observations: '',
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
  <form class="flex flex-col mx-auto items-center" @submit.prevent="submitForm">
    <div class="flex flex-col items-center gap-y-4">
      <p class="text-lg font-bold">Ajout d'un panneau</p>

      <!-- <div class="flex flex-row justify-around items-center gap-3"> -->
      <!-- <div class="avatar">
          <div class="h-40 w-40">
            <img
              src="/src/assets/images/Panneau1.jpg"
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div> -->
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Photo du panneau</span>
        </div>
        <input
          type="file"
          class="file-input file-input-primary w-full max-w-xs"
        />
      </label>
      <!-- </div> -->

      <!-- disponibility -->
      <div class="form-control w-52">
        <label class="label cursor-pointer">
          <span v-if="disponibility" class="label-text">Disponible</span>
          <span v-else class="label-text">Indisponible</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="disponibility"
          />
        </label>
      </div>

      <!-- disponibility_date -->
      <!-- //TODO ajout de la gestion des dates now() pour la date actuel 'value' et pour le min voir avec charles -->
      <label for="disponibility_date">Date de disponibilité:</label>
      <input
        type="date"
        id="disponibility_date"
        name="trip-start"
        value="2024-10-29"
        min="2024-10-29"
        class="bg-base-100"
        v-model="disponibility_date"
      />

      <!-- adresse -->
      <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <input
          type="adresse"
          class="placeholder-base-content/70"
          placeholder="Adresse"
          v-model="adresse"
        />
      </label>

      <!-- town -->
      <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <input
          type="town"
          class="placeholder-base-content/70"
          placeholder="Ville"
          v-model="town"
        />
      </label>

      <!-- postal_code -->
      <label class="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4 opacity-70"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
          />
        </svg>
        <input
          type="postal_code"
          class="placeholder-base-content/70"
          placeholder="Code postale"
          v-model="postal_code"
        />
      </label>

      <!-- position -->
      <div class="flex flex-row gap-3">
        <div class="form-control">
          <label class="label cursor-pointer gap-2">
            <span class="label-text">BR Gauche</span>
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-primary"
              checked="checked"
              value="BR Gauche"
              v-model="position"
            />
          </label>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer gap-2">
            <span class="label-text">BR Droit</span>
            <input
              type="radio"
              name="radio-10"
              class="radio checked:bg-primary"
              value="BR Droit"
              v-model="position"
            />
          </label>
        </div>
      </div>

      <!-- format -->
      <!-- class="h-4 w-4 opacity-70"  -->
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="format"
          class="placeholder-base-content/70"
          placeholder="Format : 2mx2m"
          v-model="format"
        />
      </label>

      <!-- observations -->
      <label class="form-control">
        <div class="label">
          <span class="label-text">Observations</span>
        </div>
        <textarea
          class="textarea textarea-bordered h-24 w-full"
          v-model="observations"
        ></textarea>
      </label>

      <button type="submit" class="btn btn-primary w-1/2">
        Ajouter le panneau
      </button>

      <p v-if="errorMessage" class="text-red-500 text-md mt-2">
        {{ errorMessage }}
      </p>
    </div>
  </form>
</template>

<style></style>
