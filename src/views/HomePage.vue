<script>
import { mapState, mapActions } from 'pinia'
import { useHomeStore } from '@/stores/home'
import { useUserStore } from '@/stores/user'

export default {
  name: 'HomePage',
  computed: {
    ...mapState(useHomeStore, [
      'isEditing',
      'editableImage',
      'currentSlide',
      'slides',
      'faces',
      'newSlides',
      'newFaces',
    ]),
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    ...mapActions(useHomeStore, [
      'toggleEdit',
      'editImage',
      'updateImage',
      'addImage',
      'nextSlide',
      'prevSlide',
      'fetchContent',
    ]),
  },
  mounted() {
    this.fetchContent()
  },
}
</script>

<template>
  <div class="flex flex-col mx-4 gap-6">
    <div v-if="userLoggedIn" class="flex justify-end">
      <button @click="toggleEdit" class="btn btn-sm btn-outline btn-primary">
        <span v-if="isEditing">Arrêter l'édition</span>
        <span v-else>Éditer la page</span>
      </button>
    </div>

    <div
      class="flex flex-col gap-6 md:flex-row md:justify-between md:items-center"
    >
      <div class="flex flex-col gap-y-12 md:w-1/2 items-center md:items-start">
        <h1
          :contenteditable="isEditing"
          class="text-7xl font-bold text-center sm:text-5xl md:text-6xl md:text-start lg:text-7xl"
          :class="{ 'border border-dashed border-primary': isEditing }"
        >
          Un panneau, <br />
          <span class="text-primary">1000</span> regards
        </h1>

        <p
          :contenteditable="isEditing"
          class="text-sm text-gray-700 leading-relaxed sm:text-base md:text-lg"
          :class="{ 'border border-dashed border-primary': isEditing }"
        >
          Donec tincidunt ultricies dui, at tincidunt nisl porta eu. Fusce nec
          ipsum dignissim, egestas nisl a, interdum dui. Fusce urna erat,
          efficitur et lectus vitae, congue tincidunt augue. Suspendisse
          venenatis vel elit sed ullamcorper. Donec vel semper risus, eu mollis
          lectus. Phasellus commodo lectus libero. Integer lorem enim, lobortis
          sed mi quis, suscipit vulputate nulla. Donec at vulputate metus, a
          varius purus.
        </p>

        <RouterLink to="/map">
          <button
            class="btn btn-primary md:btn-md lg:btn-lg flex items-center gap-2"
          >
            Carte Interactive
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </RouterLink>
      </div>

      <div
        class="flex justify-center items-center w-full md:w-1/2"
        :class="{ 'border border-dashed border-primary': isEditing }"
      >
        <div
          v-if="slides.length > 0"
          class="carousel w-full h-auto md:h-[400px] lg:h-[600px] rounded-lg overflow-hidden"
        >
          <div
            v-for="(slide, index) in slides"
            :key="index"
            class="carousel-item relative w-full h-full"
            :class="{
              hidden: currentSlide !== index,
              flex: currentSlide === index,
            }"
          >
            <img
              v-if="slide.id != 'add_img'"
              :src="slide.image_link"
              class="w-full h-full object-cover"
            />

            <div
              v-if="isEditing && slide.id == 'add_img'"
              class="w-full h-full flex items-center justify-center bg-gray-200"
            >
              <figure
                class="w-full h-[400px] flex flex-col items-center justify-center bg-gray-200 rounded-lg"
              >
                <button
                  v-if="
                    (isEditing &&
                      editableImage?.index === '' &&
                      editableImage?.type === '') ||
                    (isEditing &&
                      editableImage?.index === 0 &&
                      editableImage?.type === 'faces_add')
                  "
                  @click="editImage(index, 'carousel')"
                  class="bg-gray-200 bottom-5 left-5 z-10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-8 bg-gray-200"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                </button>
                <span
                  class="text-gray-500 z-10"
                  v-if="
                    (isEditing &&
                      editableImage?.index === '' &&
                      editableImage?.type === '') ||
                    (isEditing &&
                      editableImage?.index === 0 &&
                      editableImage?.type === 'faces_add')
                  "
                  >Aucune image enregistrée</span
                >
              </figure>
            </div>

            <div
              v-if="
                isEditing &&
                editableImage?.index === index &&
                editableImage?.type === 'carousel' &&
                slide.id == 'add_img'
              "
              class="absolute top-5 left-5 bg-white p-2 shadow rounded"
            >
              <input
                type="text"
                v-model="slides[index].image_link"
                @blur="addImage(slides[index].image_link)"
                class="input input-sm"
                placeholder="Image URL"
              />
            </div>

            <div
              v-if="
                isEditing &&
                editableImage?.index === index &&
                editableImage?.type === 'carousel' &&
                slide.id != 'add_img'
              "
              class="absolute top-5 left-5 bg-white p-2 shadow rounded"
            >
              <input
                type="text"
                v-model="slides[index].image_link"
                @blur="updateImage(slides[index].image_link)"
                class="input input-sm"
                placeholder="Image URL"
              />
            </div>
            <button
              v-if="isEditing && slide.id != 'add_img'"
              @click="editImage(index, 'carousel')"
              class="btn btn-sm absolute bottom-5 left-5"
              style="
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                font-weight: bold;
              "
            >
              Modifier
            </button>

            <div
              v-if="slides.length > 1"
              class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
            >
              <button @click="prevSlide" class="btn btn-circle">❮</button>
              <button @click="nextSlide" class="btn btn-circle">❯</button>
            </div>
          </div>
        </div>

        <figure
          v-else
          class="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-lg"
        >
          <span class="text-gray-500"
            >Aucune image de carrousel n'est enregistrée actuellement</span
          >
        </figure>
      </div>
    </div>

    <div class="flex flex-col items-center gap-y-6">
      <h1
        :contenteditable="isEditing"
        class="text-4xl font-bold text-center sm:text-5xl md:text-6xl md:text-start lg:text-7xl"
        :class="{ 'border border-dashed border-primary': isEditing }"
      >
        Nos <span class="text-primary">faces</span> disponibles
      </h1>

      <div
        class="flex flex-row flex-wrap gap-6 justify-center md:justify-start"
      >
        <div
          v-if="faces.length > 0"
          class="flex flex-wrap gap-6 justify-center md:justify-start"
        >
          <figure
            v-for="(face, index) in faces"
            :key="index"
            class="w-96 h-64 flex items-center justify-center bg-gray-200 rounded-t-lg relative"
            :class="{ 'border border-dashed border-primary': isEditing }"
          >
            <img
              v-if="face.id != 'add_img'"
              :src="face.image_link"
              class="w-full h-full object-cover rounded-t-lg"
            />

            <figure
              v-if="face.id == 'add_img' && isEditing"
              class="w-full h-full flex flex-col items-center justify-center bg-gray-200 rounded-lg"
            >
              <button
                v-if="
                  (isEditing &&
                    editableImage?.index === '' &&
                    editableImage?.type === '') ||
                  (isEditing &&
                    editableImage?.index === 0 &&
                    editableImage?.type === 'carousel_add')
                "
                @click="editImage('faces_add', 'faces_add')"
                class="bg-gray-200 bottom-5 left-5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8 bg-gray-200"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <span
                v-if="
                  (isEditing &&
                    editableImage?.index === '' &&
                    editableImage?.type === '') ||
                  (isEditing &&
                    editableImage?.index === 0 &&
                    editableImage?.type === 'carousel_add')
                "
                class="text-gray-500"
                >Aucune image enregistrée</span
              >
            </figure>
            <div
              v-if="
                isEditing &&
                editableImage?.index === 'faces_add' &&
                editableImage?.type === 'faces_add' &&
                face.id == 'add_img'
              "
              class="absolute top-5 left-5 bg-white p-2 shadow rounded"
            >
              <input
                type="text"
                v-model="faces[index].image_link"
                @blur="addImage(faces[index].image_link)"
                class="input input-sm"
                placeholder="Image URL"
              />
            </div>

            <div
              v-if="
                isEditing &&
                editableImage?.index === index &&
                editableImage?.type === 'faces' &&
                face.id != 'add_img'
              "
              class="absolute top-5 left-5 bg-white p-2 shadow rounded"
            >
              <input
                type="text"
                v-model="faces[index].image_link"
                @blur="updateImage(faces[index].image_link)"
                class="input input-sm"
                placeholder="Image URL"
              />
            </div>
            <button
              v-if="isEditing && face.id != 'add_img'"
              @click="editImage(index, 'faces')"
              class="btn btn-sm absolute bottom-5 left-5"
              style="
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                font-weight: bold;
              "
            >
              Modifier
            </button>
          </figure>
        </div>

        <div
          v-else
          class="flex flex-wrap gap-6 justify-center md:justify-start"
        >
          <figure
            class="w-96 h-64 flex items-center justify-center bg-gray-200 rounded-t-lg relative"
          >
            <span class="text-gray-500"
              >Aucune faces n'est enregistrée actuellement</span
            >
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
[contenteditable='true'] {
  outline: 2px dashed #6b7280;
  padding: 2px;
}
</style>
