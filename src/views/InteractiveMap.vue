<script setup>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'

// import arcades from '@/arcade.json'

let zoom = ref(6)
let center = ref([38, 139.69])
</script>

<template>
  <div class="text-center">
    <p class="text-2xl">Carte intéractive</p>
  </div>
  <main>
    <l-map
      ref="map"
      v-model:zoom="zoom"
      v-model:center="center"
      :useGlobalLeaflet="false"
    >
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
      ></l-tile-layer>
    </l-map>
  </main>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

main {
  height: 100vh;
  width: 100vw;
}
</style>
