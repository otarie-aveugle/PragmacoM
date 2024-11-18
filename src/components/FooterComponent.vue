<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'FooterComponent',
  mounted() {
    this.scrollToAnchor()
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    scrollToAnchor() {
      const anchor = this.$route.hash
      if (anchor) {
        const element = document.querySelector(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    },
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
}
</script>

<template>
  <footer
    class="mt-6 p-6 flex flex-col bg-neutral text-base-100 text-center md:flex-row md:justify-between md:items-center"
  >
    <div class="mx-4 text-left">
      <ul class="menu menu-vertical">
        <li class="text-lg">PragmacoM</li>
        <li class="text-lg">43 RUE DU MOULIN D AULINE</li>
        <li class="text-lg">78720 SENLISSE</li>
        <li class="text-lg">France</li>
      </ul>
    </div>

    <div class="mx-4 text-left">
      <ul class="menu menu-vertical md:menu-horizontal md:gap-x-6">
        <li class="text-lg">cpragmacom@aol.com</li>
        <RouterLink
          to="/privacy_policy#privacy-policy"
          class="link link-hover text-lg"
          ><li>Politique de confidentialité</li>
        </RouterLink>
        <RouterLink
          to="/legal_notices#legal-notices"
          class="link link-hover text-lg"
        >
          <li>Mentions légales</li>
        </RouterLink>
        <RouterLink
          v-if="!userLoggedIn"
          to="/login"
          class="link link-hover text-lg"
          ><li>Connexion</li>
        </RouterLink>
        <RouterLink
          v-else
          to="/"
          class="link link-hover text-lg"
          @click="logout"
          ><li>Déconnexion</li>
        </RouterLink>
      </ul>
    </div>
  </footer>
</template>

<style></style>
