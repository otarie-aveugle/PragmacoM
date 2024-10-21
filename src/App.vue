<script>
import NavbarComponent from '@/components/NavbarComponent.vue'

export default {
  components: {
    NavbarComponent,
  },
}
</script>

<template>
  <div class="main" data-theme="pragmacom_theme">
    <NavbarComponent />

    <RouterView />

    <!-- <Footer /> -->
  </div>
</template>

<style>
@font-face {
  font-family: 'Route159';
  src: url('~@/assets/fonts/route159_110/Route159-Regular.eot') format('eot');
}

.main {
  font-family: 'Route159';
}
</style>
