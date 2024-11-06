<script>
import { useUserStore } from '@/stores/user'
import { mapState } from 'pinia'

import Panneau1 from '../assets/images/Panneau1.jpg'
import Panneau2 from '../assets/images/Panneau2.jpg'
import Panneau3 from '../assets/images/Panneau3.jpg'
import Panneau4 from '../assets/images/Panneau4.jpg'

export default {
  name: 'HomePage',
  data() {
    return {
      isEditing: false,
      editableImage: null,
      currentSlide: 0,
      slides: [
        {
          image:
            'https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp',
        },
        {
          image:
            'https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp',
        },
        {
          image:
            'https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp',
        },
        {
          image:
            'https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp',
        },
      ],
      faces: [
        {
          image: Panneau1,
        },
        {
          image: Panneau2,
        },
        {
          image: Panneau3,
        },
        {
          image: Panneau4,
        },
      ],
    }
  },
  computed: {
    ...mapState(useUserStore, ['userLoggedIn']),
  },
  methods: {
    toggleEdit() {
      this.isEditing = !this.isEditing
    },
    editImage(index, type) {
      this.editableImage = { index, type }
    },
    updateImage(newUrl) {
      if (this.editableImage.type === 'carousel') {
        this.slides[this.editableImage.index].image = newUrl
      } else if (this.editableImage.type === 'faces') {
        this.faces[this.editableImage.index].image = newUrl
      }
      this.editableImage = null
    },
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length
    },
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
      <!-- texte+CTA -->
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
      <!-- carousel -->
      <div class="flex justify-center items-center w-full md:w-1/2">
        <div
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
              :src="slide.image"
              class="w-full h-full object-cover"
              :class="{ 'border border-dashed border-primary': isEditing }"
            />
            <div
              v-if="
                isEditing &&
                editableImage?.index === index &&
                editableImage?.type === 'carousel'
              "
              class="absolute top-5 left-5 bg-white p-2 shadow rounded"
            >
              <input
                type="text"
                v-model="slides[index].image"
                @blur="updateImage(slides[index].image)"
                class="input input-sm"
                placeholder="Image URL"
              />
            </div>
            <button
              v-if="isEditing"
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
              class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between"
            >
              <button @click="prevSlide" class="btn btn-circle">❮</button>
              <button @click="nextSlide" class="btn btn-circle">❯</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- faces disponibles -->
    <div class="flex flex-col gap-y-6">
      <h1
        class="text-4xl font-bold text-center sm:text-5xl md:text-6xl md:text-start lg:text-7xl"
      >
        Nos <span class="text-primary">faces</span> disponibles
      </h1>
      <div
        class="flex flex-row flex-wrap gap-6 justify-center md:justify-start"
      >
        <figure
          v-for="(face, index) in faces"
          :key="index"
          class="w-96 h-64 flex items-center justify-center bg-gray-200 rounded-t-lg relative"
        >
          <img
            :src="face.image"
            alt="panel"
            class="w-full h-full object-cover rounded-t-lg"
          />
          <div
            v-if="
              isEditing &&
              editableImage?.index === index &&
              editableImage?.type === 'faces'
            "
            class="absolute top-5 left-5 bg-white p-2 shadow rounded"
          >
            <input
              type="text"
              v-model="faces[index].image"
              @blur="updateImage(faces[index].image)"
              class="input input-sm"
              placeholder="Image URL"
            />
          </div>
          <button
            v-if="isEditing"
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
    </div>
  </div>
</template>

<style>
[contenteditable='true'] {
  outline: 2px dashed #6b7280;
  padding: 2px;
}
</style>
