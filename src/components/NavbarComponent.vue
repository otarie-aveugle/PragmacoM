<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'NavbarComponent',
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
  },
}
</script>

<template>
  <div class="navbar bg-base-100 text-base-100-content mb-6 drop-shadow">
    <div class="navbar-start mx-4">
      <RouterLink to="/"
        ><img src="../assets/logo/PragamacoM.png" class="min-h-10 h-14"
      /></RouterLink>
    </div>
    <div class="navbar-end">
      <p>
        <RouterLink to="/PanelsPage" class="px-3 py-2 rounded-md transition-all duration-300 hover:bg-primary hover:text-white hover:shadow">
          Panneaux
        </RouterLink>
      </p>
      <ul class="menu menu-horizontal px-1">
        <li>
          <RouterLink to="/map">Carte intéractive</RouterLink>
        </li>
        <li v-if="!userLoggedIn" class="mx-2">
          <RouterLink to="/login">Connexion</RouterLink>
        </li>
        <li v-else class="mx-2">
          <RouterLink to="/" @click="logout">Déconnexion</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style></style>
