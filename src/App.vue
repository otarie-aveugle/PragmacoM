<script>
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '@/stores/user'
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout', 'initUser']),
  },
  async mounted() {
    await this.initUser()
  },
}
</script>

<template>
  <div class="main flex flex-col min-h-screen" data-theme="pragmacom_theme">
    <NavbarComponent />

    <RouterView />

    <dialog v-if="userLoggedIn" id="logoutModal" class="modal modal-middle px-4 sm:px-6">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirmation de déconnexion</h3>
        <p class="py-4">
          Cette action vous déconnectera de votre session actuelle
        </p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Annuler</button>
          </form>
          <button class="btn btn-error ml-4" @click="logout()">
            <RouterLink to="/">Déconnexion</RouterLink>
          </button>
        </div>
      </div>
    </dialog>

    <FooterComponent />
  </div>
</template>

<style>
/* @font-face {
  font-family: 'Route159';
  src: url('~@/assets/fonts/route159_110/Route159-Regular.eot') format('eot')
      url('~@/assets/fonts/route159_110/Route159-Regular.otf') format('otf');
} */

@font-face {
  font-family: 'malgun-gothic';
  src: url('~@/assets/fonts/malgun-gothic/malgun-gothic.ttf') format('ttf');
}

@font-face {
  font-family: 'Inter';
  src: url('~@/assets/fonts/inter/Inter_18pt-Regular.ttf') format('ttf') url('~@/assets/fonts/inter/Inter-Regular.otf') format('otf');
}

.main {
  font-family: 'malgun-gothic' !important;
}

h1 {
  font-family: 'Inter' !important;
}
</style>
