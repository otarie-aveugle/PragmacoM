<script>
import NavbarComponent from '@/components/NavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
}
</script>

<template>
  <div class="main" data-theme="pragmacom_theme">
    <NavbarComponent />

    <RouterView />

    <FooterComponent />
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
