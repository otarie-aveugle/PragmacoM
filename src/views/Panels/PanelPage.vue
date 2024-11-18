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
    ...mapActions(usePanelStore, ['getPanelById', 'getPanelImage']),
  },
  async created() {
    this.panel = await this.getPanelById(this.panel_id)
    if (this.panel.imageFileId) {
      this.panel.preview = await this.getPanelImage(this.panel.imageFileId)
    }
  },
}
</script>

<template>
  <div class="flex flex-grow flex-col items-center justify-center px-4 sm:px-6">
    <div class="mx-4 card bg-base-100 shadow-xl w-full max-w-xl lg:max-w-4xl">
      <figure
        v-if="panel.preview"
        class="relative w-full aspect-w-16 aspect-h-9"
      >
        <img
          v-bind:src="panel.preview"
          alt="panel"
          class="w-full h-full object-cover object-center rounded-t-lg"
        />
      </figure>
      <figure
        v-else
        class="w-full h-64 flex items-center justify-center bg-gray-200 rounded-t-lg"
      >
        <span class="text-gray-500">Image non disponible</span>
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
          <p
            v-bind:title="panel.observations"
            class="break-words whitespace-pre-wrap pr-2"
          >
            {{ panel.observations }}
          </p>
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
