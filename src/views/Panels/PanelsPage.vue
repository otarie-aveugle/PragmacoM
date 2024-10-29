<script>
import { mapState } from 'pinia'
import { useUserStore } from '@/stores/user'

export default {
  name: 'PanelsPage',
  data() {
    return {
      //TODO remplacer les fausses données par des données provenant d'un store usePanelStore qui récupère les données de la base de donnée appwrite
      panels: [
        {
          preview: '/src/assets/images/Panneau1.jpg',
          disponibility: true,
          disponibility_date: '09-30-2024',
          adresse: '5 rue machin',
          town: 'Metz',
          postal_code: '57000',
          position: 'gauche',
          format: '2mx2m',
          observations: 'blablabla',
        },
        {
          preview: '/src/assets/images/Panneau2.jpg',
          disponibility: false,
          disponibility_date: '09-30-2024',
          adresse: '7 rue machin',
          town: 'Annecy',
          postal_code: '74000',
          position: 'gauche',
          format: '4mx2m',
          observations: 'blablabla',
        },
        {
          preview: '/src/assets/images/Panneau3.jpg',
          disponibility: true,
          disponibility_date: '09-30-2024',
          adresse: '2 rue machin',
          town: 'Arles',
          postal_code: '13200',
          position: 'droite',
          format: '5mx7m',
          observations: 'blablabla',
        },
      ],
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
}
</script>

<template>
  <div class="text-center mb-6">
    <p class="text-2xl">Liste des panneaux</p>
  </div>
  <div class="overflow-x-auto mx-14">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <!-- <th v-if="userLoggedIn">
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th> -->
          <th>Aperçu</th>
          <th>Disponibilité</th>
          <th>Date de disponibilité</th>
          <th>Adresse</th>
          <th>Ville</th>
          <th>Code postale</th>
          <th>Position</th>
          <th>Format</th>
          <th>Observations</th>
          <th v-if="userLoggedIn">Actions</th>
        </tr>
      </thead>
      <!-- end head -->
      <!-- body -->
      <tbody>
        <!-- //TODO il faut gérer le cas ou l'on n'affiche pas les panneaux indisponible si l'on est pas connecté -->
        <tr v-for="(panel, key, index) in this.panels" v-bind:key="index">
          <!-- checkbox -->
          <!-- <td v-if="userLoggedIn">
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td> -->
          <!-- preview -->
          <td>
            <div class="flex items-center gap-3">
              <div class="avatar">
                <div class="h-20 w-20">
                  <img
                    :src="panel.preview"
                    alt="Avatar Tailwind CSS Component"
                  />
                </div>
              </div>
            </div>
          </td>
          <!-- disponibility -->
          <td v-if="panel.disponibility">
            <span
              class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white"
              >Disponible
            </span>
          </td>
          <td v-else>
            <span
              class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-500 dark:text-white"
              >Indisponible
            </span>
          </td>
          <!-- disponibility_date -->
          <td>{{ panel.disponibility_date }}</td>
          <!-- adresse -->
          <td>{{ panel.adresse }}</td>
          <!-- town -->
          <td>{{ panel.town }}</td>
          <!-- postal_code -->
          <td>{{ panel.postal_code }}</td>
          <!-- position -->
          <td>{{ panel.position }}</td>
          <!-- format -->
          <td>{{ panel.format }}</td>
          <!-- observations -->
          <td>{{ panel.observations }}</td>
          <!-- actions -->
          <td v-if="userLoggedIn">
            <RouterLink to="/panel_edit" class="link link-hover">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </RouterLink>
          </td>
        </tr>
      </tbody>
      <!-- end body -->
      <!-- foot -->
      <tfoot v-if="panels.length > 1">
        <tr>
          <!-- <th v-if="userLoggedIn">
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th> -->
          <th>Aperçu</th>
          <th>Disponibilité</th>
          <th>Date de disponibilité</th>
          <th>Adresse</th>
          <th>Ville</th>
          <th>Code postale</th>
          <th>Position</th>
          <th>Format</th>
          <th>Observations</th>
          <th v-if="userLoggedIn">Actions</th>
        </tr>
      </tfoot>
      <!-- end foot -->
    </table>
  </div>
</template>

<style></style>

<!-- <td>
  <label>
    <input type="checkbox" class="checkbox" />
  </label>
</td>
<td>
  <div class="flex items-center gap-3">
    <div class="avatar">
      <div class="h-20 w-20">
        <img
          src="/src/assets/images/Panneau1.jpg"
          alt="Avatar Tailwind CSS Component"
        />
      </div>
    </div>
  </div>
</td>
<td>
  <span
    class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-500 dark:text-white"
    >Disponible
  </span>
  <span
    class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-500 dark:text-white"
    >Indisponible
  </span>
</td>
<td>Date de disponibilité</td>
<td>Adresse</td>
<td>Ville</td>
<td>Code postale</td>
<td>Position</td>
<td>Format</td>
<td>Observations</td>
<td>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    class="size-6"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
    />
  </svg>
</td> -->
