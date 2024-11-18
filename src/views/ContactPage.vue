<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useContactStore } from '@/stores/contact'

export default {
  name: 'ContactPage',
  data() {
    return {
      charCount: 0,
      toastShow: false,
      name: 'toto',
      email: 'test@test.com',
      message:
        'tfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortructfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortructfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortructfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortructfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortructfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortructfhivoiernviernvronvrivioernvrivioernvirnvoirenvoiernvoiernvioernvioernvioernvioernvioernvoiernivoernoiverniovneriovnreiovneriovneroivninvrinvioerniortruc test bipbip123 SOleil',
      phone: '0606060606',
      consent: true,
      countdown: 3,
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useContactStore, ['sendMessage']),
    updateCharacterCount() {
      this.charCount = this.message.length
    },
    closeToast() {
      this.toastShow = false
      this.$router.push({ name: 'home' })
    },
    async submitForm() {
      this.errorMessage = ''
      if (this.isFormValid()) {
        const document = {
          name: this.name,
          email: this.email,
          message: this.message,
          phone: this.phone,
          consent: this.consent,
        }
        await this.sendMessage(document)
        if (!this.errorMessage) {
          this.toastShow = true
          setTimeout(() => {
            this.toastShow = false
            if (this.$route.href === '/contact' && this.toastShow == false) {
              //prevent si l'utilsateur décide de naviguer dans le site avant la redirection
              this.$router.push({ name: 'home' })
            }
          }, 4000),
            setInterval(() => {
              --this.countdown
            }, 1000)
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
      return (
        this.validEmail(this.email) &&
        this.validTextInput(this.name) &&
        this.validTextInput(this.phone) &&
        this.validMessageLength(this.message) &&
        this.consent === true
      )
    },
    validEmail(email) {
      const regex =
        /^((?:[A-Za-z0-9!#$%&'*+\-/=?^_`{|}~]|(?<=^|\.)"|"(?=$|\.|@)|(?<=".*)[ .](?=.*")|(?<!\.)\.){1,64})(@)((?:[A-Za-z0-9.-])*(?:[A-Za-z0-9])\.(?:[A-Za-z0-9]){2,})$/
      return regex.test(email)
    },
    validTextInput(content) {
      return content.length > 0
    },
    validMessageLength(content) {
      return this.validTextInput(content) && content.length <= 2000
    },
  },
}
</script>

<template>
  <div class="flex-grow">
    <!-- Notification Toast -->
    <transition name="fade">
      <div
        v-if="toastShow"
        class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
      >
        <div
          class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center"
        >
          <h3 class="text-lg font-bold mb-2 text-green-600">Message envoyé</h3>
          <p>Votre message a bien été envoyé !</p>
          <p class="text-s text-gray-900 mt-4">
            Vous allez être redirigé dans&nbsp;
            <span class="countdown">
              <span v-bind:style="`--value:${countdown}`"></span>
            </span>
            secondes
          </p>
          <button
            @click="closeToast"
            class="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </transition>

    <!-- Formulaire de contact -->
    <form
      v-if="!toastShow"
      class="flex flex-col mx-auto items-center"
      @submit.prevent="submitForm"
    >
      <div class="card bg-base-100 w-96 shadow-xl gap-y-4 p-8">
        <p class="text-xl font-bold">Formulaire de contact</p>
        <p class="text-base mb-6">
          Laissez-nous vos coordonnées pour que nous puissions vous recontacter.
        </p>

        <label class="input input-bordered flex items-center gap-2">
          <input
            type="text"
            class="placeholder-base-content/70 w-full"
            placeholder="Nom"
            v-model="name"
            required
          />
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <input
            type="email"
            class="placeholder-base-content/70 w-full"
            placeholder="Email"
            v-model="email"
            required
          />
        </label>

        <label class="input input-bordered flex items-center gap-2">
          <input
            v-model="phone"
            placeholder="Tel"
            class="placeholder-base-content/70 w-full"
            type="tel"
            name="phone"
            pattern="^(\+33|0)[1-9]([ .\-]?[0-9]{2}){4}$"
            required
          />
        </label>

        <label>
          <textarea
            class="textarea textarea-bordered placeholder-base-content/70 text-base w-full"
            placeholder="Envoyer nous un message !"
            v-model="message"
            :maxlength="2000"
            @input="updateCharacterCount"
            required
          ></textarea>
          <div class="label">
            <span class="label-text"></span>
            <span class="label-text-alt"
              >{{ charCount }} / 2000 caractères</span
            >
          </div>
        </label>

        <div class="mb-4 flex items-start">
          <input
            type="checkbox"
            id="consent"
            v-model="consent"
            class="checkbox checkbox-primary"
            required
          />
          <label for="consent" class="ml-2 text-gray-700">
            J'accepte que mes informations soient collectées et traitées
            conformément à la
            <RouterLink to="/privacy_policy">
              <span class="text-primary"
                >politique de confidentialité</span
              > </RouterLink
            >.
          </label>
        </div>

        <button type="submit" class="btn btn-primary">Envoyer</button>

        <p v-if="errorMessage" class="text-red-500 text-md mt-2">
          {{ errorMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<style>
.toast {
  position: fixed;
  top: 7.3rem;
  z-index: 50;
}
</style>
