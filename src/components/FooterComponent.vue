<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'FooterComponent',
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
}
</script>

<template>
  <footer class="fixed bottom-0 left-0 w-full bg-base-content text-base-100 py-6 flex justify-between items-center">
    <div class="footer-start mx-4 text-lef">
      <p class="text-left">
        PragmacoM<br>
        43 RUE DU MOULIN D AULINE<br>
        78720 SENLISSE<br>
        France<br>
      </p>
    </div>

    <div class="footer-end">
      <ul class="menu menu-horizontal px-1">
        <li class="mx-2 hover:text-base-100 hover:underline transition-colors duration-300">
          <RouterLink to="/about">cpragmacom@aol.com</RouterLink>
        </li>
        <li class="mx-2 hover:text-base-100 hover:underline transition-colors duration-300">
          <RouterLink to="/contact">Contacts</RouterLink>
        </li>
        <li class="mx-2 hover:text-base-100 hover:underline transition-colors duration-300">
          <RouterLink to="/terms">Mentions légales</RouterLink>
        </li>
      </ul>
    </div>
  </footer>
</template>

<style></style>