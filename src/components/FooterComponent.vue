<script>
export default {
  name: 'FooterComponent',
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-grow"></main>

    <footer
      class="w-full bg-neutral text-base-100 py-6 flex flex-col md:flex-row md:justify-between items-start md:items-center space-y-6 md:space-y-0"
    >
      <div class="mx-4 text-left">
        <p>
          PragmacoM<br />
          43 RUE DU MOULIN D AULINE<br />
          78720 SENLISSE<br />
          France<br />
        </p>
      </div>

      <div class="mx-4">
        <ul
          class="menu menu-vertical md:menu-horizontal space-y-2 md:space-y-0 md:space-x-4"
        >
          <li class="link link-hover">
            <a href="mailto:cpragmacom@aol.com">cpragmacom@aol.com</a>
          </li>
          <li>
            <RouterLink to="/contact" class="link link-hover">
              Contacts
            </RouterLink>
          </li>
          <li>
            <RouterLink
              to="/views/LegalNotices"
              class="hover:underline duration-300"
            >
              Mentions légales
            </RouterLink>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<style></style>
