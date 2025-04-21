<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'NavbarComponent',
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
}
</script>

<template>
  <div class="mb-6 p-6 navbar bg-base-100 text-base-100-content drop-shadow">
    <div class="navbar-start mx-4">
      <RouterLink to="/"
        ><img src="../assets/logo/PragamacoM.png" class="min-h-10 h-14"
      /></RouterLink>
    </div>
    <div class="navbar-end mr-4">
      <ul class="menu menu-vertical md:menu-horizontal md:gap-x-6">
        <RouterLink
          to="/map"
          class="hover:bg-primary hover:text-white hover:shadow rounded-md"
          ><li class="text-lg p-2">Carte interactive</li>
        </RouterLink>
        <RouterLink
          to="/panels"
          class="hover:bg-primary hover:text-white hover:shadow rounded-md"
          ><li class="text-lg p-2">Emplacements disponibles</li>
        </RouterLink>
        <RouterLink
          v-if="userLoggedIn"
          to="/box"
          class="hover:bg-primary hover:text-white hover:shadow rounded-md"
          ><li class="text-lg p-2">Boîte de réception</li>
        </RouterLink>
        <RouterLink
          v-if="!userLoggedIn"
          to="/contact"
          class="hover:bg-primary hover:text-white hover:shadow rounded-md"
          ><li class="text-lg p-2">Contact</li>
        </RouterLink>
      </ul>
    </div>
  </div>
</template>

<style></style>
