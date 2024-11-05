<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePanelStore } from '@/stores/panel'

export default {
  name: 'PanelsPage',
  mounted() {
    if (this.userLoggedIn) {
      this.disponibilityState = 'all'
    }
  },
  data() {
    return {
      disponibility: false,
      disponibilityState: 'true',
    }
  },
  methods: {
    ...mapActions(usePanelStore, ['getPanels']),
  },
  created() {
    this.getPanels()
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapState(usePanelStore, ['panels']),
    filteredPanels() {
      if (this.disponibilityState === 'all') {
        return this.panels.documents
      } else {
        const isAvailable = this.disponibilityState === 'true'
        return this.panels.documents.filter(
          panel => panel.disponibility === isAvailable,
        )
      }
    },
  },
}
</script>

<template>
  <div class="flex-grow">
    <div class="text-center mb-6">
      <p class="text-3xl mb-6">Liste des panneaux</p>
    </div>
    <div
      class="overflow-x-auto mx-14"
      v-bind:class="{ 'text-center': !panels.total }"
    >
      <div class="flex flex-col items-center md:flex-row gap-2 mb-4">
        <RouterLink
          to="/create_panel"
          class="btn btn-primary"
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

        <div
          class="dropdown dropdown-bottom md:dropdown-right"
          v-if="userLoggedIn"
        >
          <div tabindex="0" role="button" class="btn">
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
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>

            Filtrer la disponibilité
          </div>
          <ul
            tabindex="0"
            class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
          >
            <li @click="this.disponibilityState = 'all'"><a>Tous</a></li>
            <li @click="this.disponibilityState = 'true'"><a>Disponible</a></li>
            <li @click="this.disponibilityState = 'false'">
              <a>Indisponible</a>
            </li>
          </ul>
        </div>
      </div>

      <table class="table" v-if="panels.total > 0">
        <!-- head -->
        <thead class="bg-base-200 text-base-content">
          <tr>
            <!-- <th v-if="userLoggedIn">
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </th> -->
            <!-- <th>Aperçu</th> -->
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
          <tr
            class="hover:bg-base-200"
            v-for="(panel, key, index) in filteredPanels"
            v-bind:key="index"
          >
            <!-- checkbox -->
            <!-- <td v-if="userLoggedIn">
            <label>
              <input type="checkbox" class="checkbox" />
            </label>
          </td> -->
            <!-- preview -->
            <!-- <td>
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
            </td> -->
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
              <div class="flex gap-2">
                <RouterLink
                  v-bind:to="/panel/ + `${panel.$id}`"
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </RouterLink>
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
              </div>
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
            <!-- <th>Aperçu</th> -->
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
