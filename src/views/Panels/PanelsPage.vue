<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePanelStore } from '@/stores/panel'

export default {
  name: 'PanelsPage',
  methods: {
    ...mapActions(usePanelStore, ['getPanels']),
  },
  created() {
    this.getPanels()
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapState(usePanelStore, ['panels']),
  },
}
</script>

<template>
  <div class="flex-grow">
    <div class="text-center mb-6">
      <p class="text-3xl mb-6">Liste des panneaux</p>
    </div>
    <div class="overflow-x-auto mx-14">
      <RouterLink
        to="/create_panel"
        class="btn btn-primary mb-4"
        v-if="userLoggedIn"
      >
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Ajouter un panneau
      </RouterLink>
      <table class="table" v-if="panels.total > 0">
        <!-- head -->
        <thead class="bg-base-200 text-base-content">
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
          <tr
            v-for="(panel, key, index) in panels.documents"
            v-bind:key="index"
          >
            <!-- checkbox -->
            <!-- <td v-if="userLoggedIn">
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td> -->
            <!-- preview -->
            <td>
              <div class="flex items-center gap-3" v-if="panel.preview">
                <div class="avatar">
                  <div class="h-20 w-20">
                    <img
                      :src="panel.preview"
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
              </div>
              <div v-else></div>
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
            <!-- address -->
            <td>{{ panel.address }}</td>
            <!-- town -->
            <td>{{ panel.town }}</td>
            <!-- postal_code -->
            <td>{{ panel.postal_code }}</td>
            <!-- position -->
            <td>{{ panel.position }}</td>
            <!-- format -->
            <td>{{ panel.format }}</td>
            <!-- observations -->
            <td v-bind:title="panel.observations">
              {{ $filters.truncateText(panel.observations, 32) }}
            </td>
            <!-- actions -->
            <td v-if="userLoggedIn">
              <RouterLink
                v-bind:to="/edit_panel/ + `${panel.$id}`"
                class="link link-hover"
              >
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
        <tfoot class="bg-base-200 text-base-content" v-if="panels.total > 1">
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
      <p class="text-center text-lg" v-else>La liste des panneaux est vide</p>
    </div>
  </div>
</template>

<style></style>
