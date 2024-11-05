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
  <div class="main flex flex-col min-h-screen" data-theme="pragmacom_theme">
    <NavbarComponent />

    <RouterView />

    <FooterComponent />
  </div>
</template>

<style>
@font-face {
  font-family: 'Route159';
  src: url('~@/assets/fonts/route159_110/Route159-Regular.eot') format('eot')
      url('~@/assets/fonts/route159_110/Route159-Regular.woff') format('woff');
}

@font-face {
  font-family: 'Inter';
  src: url('~@/assets/fonts/inter/Inter_18pt-Regular.ttf') format('ttf');
}

.main {
  font-family: 'Route159' !important;
}

h1 {
  font-family: 'Inter' !important;
}
</style>
