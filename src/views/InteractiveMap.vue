<script setup>
import 'leaflet/dist/leaflet.css'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { ref } from 'vue'

import arcades from '@/arcade.json'

let zoom = ref(6)
let center = ref([38, 139.69])
</script>

<template>
  <div class="text-center">
    <p class="text-2xl">Carte intéractive</p>
  </div>
  <main class="m-6 flex justify-center">
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
      <l-marker
        v-for="(arcade, index) in arcades.features"
        :key="index"
        :lat-lng="arcade.geometry.coordinates.reverse()"
      ></l-marker>
    </l-map>
  </main>
</template>

<style>
main {
  height: 97vh;
  width: 97vw;
}
</style>
