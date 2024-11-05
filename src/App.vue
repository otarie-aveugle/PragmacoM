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
  src: url('~@/assets/fonts/inter/Inter_18pt-Regular.ttf') format('ttf')
  url('~@/assets/fonts/inter/Inter-Regular.otf') format('otf');
}

.main {
  font-family: 'malgun-gothic' !important;
}

h1 {
  font-family: 'Inter' !important;
}
</style>
