<script>
// import StepsComponent from './components/StepsComponent.vue'

export default {
  name: 'RecoveryPasswordPage',
  // components: {
  //   StepsComponent,
  // },
}
</script>

<template>
  <div class="flex flex-col mx-auto items-center">
    <!-- <StepsComponent currentStep="one"/> -->

    <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>

<style></style>
