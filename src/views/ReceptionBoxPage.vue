<script>
import { useContactStore } from '@/stores/contact'
import { mapActions, mapState } from 'pinia'

export default {
  name: 'ReceptionBoxPage',
  computed: {
    ...mapState(useContactStore, ['messages']),
  },
  methods: {
    ...mapActions(useContactStore, ['getMessages']),
  },
  created() {
    this.getMessages()
  },
}
</script>

<template>
    <!-- add margin autour de la box pour le responsive design -->
  <div class="flex flex-col h-screen">
    <div class="text-center mb-6">
      <p class="text-3xl mb-6">Boîte de réception</p>
    </div>

    <div class="flex-grow flex justify-center items-center mx-4">
      <div class="w-full max-h-[75vh] min-h-[50vh] h-full p-5 bg-white rounded-lg shadow-lg mx-4">
        <div class="chat-container overflow-y-auto h-full">
          <!-- messages -->
          <div v-if="messages.total > 0">
            <div
              v-for="(document, key, index) in messages.documents"
              :key="index"
              class="chat chat-start"
            >
              <div class="chat-image avatar placeholder">
                <div class="bg-primary text-white w-12 rounded-full">
                  <span class="text-xl">{{
                    $filters.capitalizeText(
                      $filters.getFirstLetter(document.name),
                    )
                  }}</span>
                </div>
              </div>
              <div class="chat-header text-base">
                {{ $filters.capitalizeText(document.name) }}
              </div>
              <div
                class="chat-bubble bg-primary text-xl text-white"
                :title="document.message"
              >
                {{ $filters.truncateText(document.message, 32) }}
              </div>
              <div class="chat-footer">
                <a class="chat-footer" :href="`mailto:${document.email}`">
                  {{ document.email }} -
                </a>
                <a class="chat-footer" :href="`tel:${document.phone}`">
                  {{ document.phone }}
                </a>
              </div>
            </div>
          </div>
          <div v-else class="chat chat-end">
            <div class="chat-header">PragmacoM</div>
            <div class="chat-image avatar placeholder">
              <div class="bg-primary text-white w-12 rounded-full">
                <span class="text-xl">P</span>
              </div>
            </div>
            <div class="chat-bubble bg-primary text-xl text-white">
              Il n'y a pas de message pour le moment.
            </div>
          </div>
          <!-- end messages -->
        </div>
      </div>
    </div>
  </div>
</template>


<style></style>
