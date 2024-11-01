<script>
import { mapWritableState, mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePanelStore } from '@/stores/panel'

export default {
  name: 'EditPanelPage',
  data() {
    return {
      panel_id: this.$route.params.id,
      disponibility: false,
      disponibility_date: '',
      address: '',
      town: '',
      postal_code: '',
      position: '',
      format: '',
      observations: '',
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['errorMessage']),
    ...mapState(usePanelStore, ['panels', 'currentPanel']),
  },
  async created() {
    const panel = await this.getPanelById(this.panel_id)
    this.disponibility = panel.disponibility
    this.disponibility_date = panel.disponibility_date
    this.address = panel.address
    this.town = panel.town
    this.postal_code = panel.postal_code
    this.position = panel.position
    this.format = panel.format
    this.observations = panel.observations
  },
  methods: {
    ...mapActions(usePanelStore, [
      'getPanelById',
      'updatePanel',
      'deletePanel',
    ]),
    submitDelete() {
      this.deletePanel(this.panel_id)
      if (!this.errorMessage) {
        this.$router.push({ name: 'panels' })
      }
    },
    async submitForm() {
      this.errorMessage = ''
      if (this.isFormValid()) {
        const document = {
          disponibility: this.disponibility,
          disponibility_date: this.disponibility_date,
          address: this.address,
          town: this.town,
          postal_code: this.postal_code,
          position: this.position,
          format: this.format,
          observations: this.observations,
        }
        this.updatePanel(this.panel_id, document)
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
      return (
        this.textInputIsValid(this.address) &&
        this.textInputIsValid(this.town) &&
        this.textInputIsValid(this.postal_code) &&
        this.textInputIsValid(this.format)
      )
    },
    textInputIsValid(value_inputText) {
      return value_inputText.length > 0
    },
  },
}
</script>

<template>
  <form class="flex justify-center m-4" @submit.prevent="submitForm">
    <div class="flex flex-col justify-center gap-y-4">
      <p class="text-xl font-bold text-center">Modification d'un panneau</p>

      <div class="flex flex-col gap-3">
        <label class="label-text text-base">Photo du panneau</label>
        <input
          type="file"
          class="file-input file-input-primary w-full max-w-xs"
        />
      </div>

      <!-- disponibility -->
      <label class="label-text text-base">Disponibilité du panneau</label>
      <div class="form-control w-full">
        <label class="label cursor-pointer flex flex-row justify-between p-0">
          <span v-if="disponibility" class="label-text text-base"
            >Disponible</span
          >
          <span v-else class="label-text text-base">Indisponible</span>
          <input
            type="checkbox"
            class="toggle toggle-primary"
            v-model="disponibility"
          />
        </label>
      </div>

      <!-- disponibility_date -->
      <!-- //TODO ajout de la gestion des dates now() pour la date actuel 'value' et pour le min voir avec charles -->
      <label class="label-text text-base">Date de disponibilité</label>
      <input
        type="date"
        id="disponibility_date"
        name="trip-start"
        min="2024-10-29"
        class="bg-base-100"
        v-model="disponibility_date"
      />

      <!-- address -->
      <label class="label-text text-base">Emplacement du panneau</label>
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
          type="text"
          class="placeholder-base-content/70"
          placeholder="Adresse"
          v-model="address"
          required
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
          type="text"
          class="placeholder-base-content/70"
          placeholder="Ville"
          v-model="town"
          required
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
          type="text"
          class="placeholder-base-content/70"
          placeholder="Code postale"
          v-model="postal_code"
          required
        />
      </label>

      <!-- position -->
      <div>
        <label class="label-text text-base">Position du panneau</label>
        <div class="flex flex-row items-center gap-3">
          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <span class="label-text">BR Gauche</span>
              <input
                type="radio"
                name="position"
                class="radio checked:bg-primary"
                checked="checked"
                value="BR Gauche"
                v-model="position"
                required
              />
            </label>
          </div>
          <div class="form-control">
            <label class="label cursor-pointer gap-2">
              <span class="label-text">BR Droit</span>
              <input
                type="radio"
                name="position"
                class="radio checked:bg-primary"
                value="BR Droit"
                v-model="position"
              />
            </label>
          </div>
        </div>
      </div>

      <!-- format -->
      <label class="label-text text-base">Format du panneau</label>
      <label class="input input-bordered flex items-center gap-2">
        <input
          type="text"
          class="placeholder-base-content/70"
          placeholder="Format"
          v-model="format"
        />
      </label>

      <!-- observations -->
      <div class="flex flex-col gap-3">
        <label class="label-text text-base">Observations</label>
        <textarea
          class="textarea textarea-bordered h-24 w-full"
          v-model="observations"
        ></textarea>
      </div>

      <div class="flex flex-row gap-3">
        <button type="submit" class="btn btn-primary w-1/2">
          Modifier le panneau
        </button>

        <button
          type="button"
          class="btn btn-error w-1/2"
          onclick="my_modal_5.showModal()"
        >
          Supprimer le panneau
        </button>
        <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
          <div class="modal-box">
            <h3 class="text-lg font-bold">
              Voulez-vous vraiment supprimer ce panneau ?
            </h3>
            <p class="py-4">Attention, cette action est iréversible !</p>
            <div class="modal-action">
              <form method="dialog">
                <button class="btn">Annuler</button>
              </form>
              <button class="btn btn-error ml-4" @click="submitDelete()">
                Supprimer
              </button>
            </div>
          </div>
        </dialog>
      </div>

      <p v-if="errorMessage" class="text-red-500 text-md mt-2">
        {{ errorMessage }}
      </p>
    </div>
  </form>
</template>

<style></style>
