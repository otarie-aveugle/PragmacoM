<script>
import { mapWritableState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useContactStore } from '@/stores/contact'

export default {
  name: 'ContactPage',
  data() {
    return {
      toastShow: false,
      name: '',
      email: '',
      message: '',
      phone: '',
      consent: false,
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['errorMessage']),
  },
  methods: {
    ...mapActions(useContactStore, ['sendMessage']),
    closeToast() {
      this.toastShow = false
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
            if (this.$route.href === '/contact') {
              //prevent si l'utilsateur décide de naviguer dans le site avant la redirection
              this.$router.push({ name: 'home' })
            }
          }, 4000)
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
        this.validTextInput(this.message) &&
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
  },
}
</script>

<template>
  <div class="flex-grow">
    <div v-if="toastShow" class="toast toast-top toast-center">
      <div class="alert alert-success">
        <span>Le message a bien été envoyé !</span>
        <button @click="closeToast" class="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
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

        <textarea
          class="textarea textarea-bordered placeholder-base-content/70 text-base"
          placeholder="Envoyer nous un message !"
          v-model="message"
          required
        ></textarea>

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
              ></RouterLink
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
