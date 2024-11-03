<script>
import { mapActions } from 'pinia'
import { usePanelStore } from '@/stores/panel'

export default {
  name: 'PanelPage',
  data() {
    return {
      panel_id: this.$route.params.id,
      panel: {},
    }
  },
  methods: {
    ...mapActions(usePanelStore, ['getPanelById']),
  },
  async created() {
    this.panel = await this.getPanelById(this.panel_id)
  },
}
</script>

<template>
  <div class="flex flex-col flex-grow items-center">
    <!-- <p class="text-center text-3xl mb-6">Panneau {{ panel_id }}</p> -->

    <div class="mx-6 card bg-base-100 shadow-xl">
      <figure>
        <img src="../../assets/images/Panneau1.jpg" alt="panel" />
      </figure>
      <div class="card-body gap-y-2">
        <h2 class="card-title">
          {{ panel.address }}
          <div
            v-if="panel.disponibility"
            class="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white"
          >
            Disponible
          </div>
          <div
            v-else
            class="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-red-500 dark:text-white"
          >
            Indisponible
          </div>
        </h2>
        <div class="flex flex-col gap-y-4">
          <p class="text-lg">{{ panel.postal_code }} - {{ panel.town }}</p>
          <p>{{ panel.observations }}</p>
        </div>

        <div class="card-actions justify-end">
          <div class="badge badge-outline">{{ panel.format }}</div>
          <div class="badge badge-outline">{{ panel.position }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
