<script>
export default {
  name: 'NotFoundPage',
}
</script>

<template>
  <section class="flex items-center h-full p-16 dark:text-gray-800">
    <div
      class="container flex flex-col items-center justify-center px-5 mx-auto my-8"
    >
      <div class="max-w-xl text-center bg-white shadow-lg rounded-lg p-16">
        <h2 class="mb-8 font-extrabold text-9xl dark:text-gray-400">
          <span class="sr-only"></span> 404
        </h2>
        <p class="text-2xl font-semibold md:text-3xl">Page non trouvée</p>
        <p class="mt-4 mb-8 dark:text-gray-600">
          Oups, nous n'avons pas pu trouver cette page.
        </p>
        <RouterLink
          to="/"
          class="px-8 py-3 font-semibold rounded bg-primary text-white hover:bg-blue-600 transition duration-300"
        >
          Page d'accueil
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<style></style>
