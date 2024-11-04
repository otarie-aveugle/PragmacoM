<script>
export default {
  name: 'FooterComponent',
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
        <RouterLink to="/privacy_policy" class="link link-hover text-lg"
          ><li>Politique de confidentialité</li>
        </RouterLink>
        <RouterLink to="/contact" class="link link-hover text-lg"
          ><li>Contact</li>
        </RouterLink>
        <RouterLink to="/legal_notices" class="link link-hover text-lg">
          <li>Mentions légales</li>
        </RouterLink>
      </ul>
    </div>
  </footer>
</template>

<style></style>