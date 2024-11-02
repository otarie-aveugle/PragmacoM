<script setup>
// import 'leaflet/dist/leaflet.css'
// import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
// import { ref } from 'vue'

// // import arcades from '@/arcade.json'

// let zoom = ref(6)
// let center = ref([45.5, 1.888334]) //Latitude et Longitude
// let markerLatLng = ref([48.8566, 2.3522]) //Latitude et Longitude
// //TODO récupérer la latitude et longitude en fonction de l'adresse et l'afficher comme marker dans la carte avec le v-for
</script>

<!-- si un component ne fonctionne pas, vérifier l'import ! -->
<template>
  <div class="text-center">
    <p class="text-2xl">Carte intéractive</p>
  </div>
  <!-- <main class="m-6 flex justify-center">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      v-model:center="center"
      :useGlobalLeaflet="false"
    >
      <l-tile-layer
        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
      ></l-tile-layer>
      <l-marker
        v-for="(arcade, index) in arcades.features.slice(0, 10)"
        :key="index"
        :lat-lng="arcade.geometry.coordinates.reverse()"
      ></l-marker>
      <l-marker :lat-lng="markerLatLng">
        <l-popup>
          <RouterLink to="/">REDIRECTION DANS LA POPUP DU MARKER</RouterLink>
        </l-popup>
      </l-marker>
    </l-map>
  </main> -->

  <!-- carte de test -->
  <iframe
    width="100%"
    height="300px"
    frameborder="0"
    allowfullscreen
    allow="geolocation"
    src="//umap.openstreetmap.fr/fr/map/test-carte-interactive_1133743?scaleControl=true&miniMap=true&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=false&searchControl=true&tilelayersControl=true&embedControl=false&datalayersControl=false&onLoadPanel=none&captionBar=false&captionMenus=true&locateControl=true&measureControl=true&editinosmControl=false&starControl=false"
  ></iframe>

  <!-- Solution simple et rapide d'intégration de la carte d'origine de la localisation des panneaux avec possibilité d'ajout de lien et de photo dans les popups voir: https://docs.framasoft.org/fr/umap/5-infobulles-multimedia.html -->
  <!-- carte pragmacom -->
  <!-- <iframe
    class="m-6 flex justify-center"
    frameborder="0"
    allowfullscreen
    allow="geolocation"
    src="//framacarte.org/fr/map/panneaux_123638?scaleControl=true&miniMap=true&scrollWheelZoom=true&zoomControl=true&editMode=disabled&moreControl=false&searchControl=true&tilelayersControl=true&embedControl=false&datalayersControl=false&onLoadPanel=none&captionBar=true&captionMenus=true&locateControl=true&measureControl=true&editinosmControl=true&starControl=false"
  ></iframe> -->
</template>

<style>
main,
iframe {
  height: 97vh;
  width: 97vw;
}
</style>
