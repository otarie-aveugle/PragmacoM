<script>
import { mapState, mapActions, mapWritableState } from 'pinia'
import { useHomeStore } from '@/stores/home'
import { useUserStore } from '@/stores/user'
import { quillEditor } from 'vue3-quill'

export default {
  name: 'HomePage',
  components: {
    quillEditor
  },
  computed: {
    ...mapState(useHomeStore, [
      'isEditing',
      'editableImage',
      'currentSlide',
      'slides',
      'faces',
      'newSlides',
      'newFaces',
      'contentData',
    ]),
    ...mapState(useUserStore, ['userLoggedIn']),
    ...mapWritableState(useHomeStore, ['title1', 'title2', 'content_text']),
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
      'updateContentData',
    ]),
    async saveField(index, label) {
      try {
        if (await this.updateContentData(index)) this.showToast(`${label} modifié avec succès`, 'success')
      } catch (error) {
        this.showToast(`Erreur lors de la sauvegarde de ${label}`, 'error')
      }
    },
    showToast(message, type) {
      const toast = document.createElement('div')
      toast.className = 'toast toast-top toast-center z-[100]'
      toast.innerHTML = `
        <div class="alert ${type === 'success' ? 'alert-success' : 'alert-error'} text-white">
          <span>${message}</span>
        </div>
      `
      document.body.appendChild(toast)
      setTimeout(() => {
        toast.remove()
      }, 3000)
    },
    onEditorChange(field, value) {
      if (this[field] && this[field].content !== undefined) {
        this[field].content = value.html
      }
    }
  },
  async mounted() {
    await this.fetchContent()
  },
  data() {
    return {
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: false
        }
      }
    }
  }
}
</script>

<template>
  <!-- Overlay (Masque gris) -->
  <div v-if="isEditing"
    class="fixed inset-0 bg-black bg-opacity-40 z-30 transition-opacity duration-300 pointer-events-auto"></div>

  <!-- Bandeau "Mode édition activé" -->
  <div v-if="isEditing"
    class="fixed top-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded z-50 shadow-lg flex items-center gap-4">
    <span>Mode édition activé</span>
    <button @click="toggleEdit" class="btn btn-sm bg-primary text-white border-white hover:bg-blue-600">
      Arrêter l'édition
    </button>
  </div>

  <!-- Bouton d'activation du "Mode édition" -->
  <div class="mt-4 flex flex-col mx-4 gap-6">
    <div v-if="userLoggedIn && !isEditing" class="flex justify-end">
      <button @click="toggleEdit" class="btn btn-sm btn-outline btn-primary">
        <span>Éditer la page</span>
      </button>
    </div>

    <div class="mt-4 flex flex-col mx-4 gap-6 relative z-40">
      <div class="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <div class="flex flex-col gap-y-12 md:w-1/2 items-center md:items-start">

          <!-- Title 1 -->
          <div>
            <div v-if="isEditing" class="flex items-center gap-2 mb-2">
              <button @click="saveField(0, 'Titre 1')" class="btn btn-sm bg-primary text-white hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17 16v4H7v-4m10-10H7v4h10V6z" />
                </svg>
                Sauvegarder
              </button>
            </div>
            <div v-if="isEditing" class="w-full border border-dashed border-primary rounded p-4 bg-white z-40 relative">
              <quill-editor class="min-w-80 md:min-w-96" :options="editorOption" :content="title1.content"
                @change="onEditorChange('title1', $event)" />
            </div>
            <h1 v-else class="text-5xl font-bold text-center md:text-start lg:text-7xl"
              v-html="title1.content || 'Un panneau, <br /><span class=\'text-primary\'>1000</span> regards'">
            </h1>
          </div>

          <!-- Content Text -->
          <div>
            <div v-if="isEditing" class="flex items-center gap-2 mb-2">
              <button @click="saveField(2, 'Contenu principal')"
                class="btn btn-sm bg-primary text-white hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17 16v4H7v-4m10-10H7v4h10V6z" />
                </svg>
                Sauvegarder
              </button>
            </div>
            <div v-if="isEditing" class="w-full border border-dashed border-primary rounded p-4 bg-white z-40 relative">
              <quill-editor class="min-w-80 md:min-w-96" :options="editorOption" :content="content_text.content"
                @change="onEditorChange('content_text', $event)" />
            </div>
            <p v-else class="text-lg text-gray-700 leading-relaxed md:text-2xl"
              v-html="content_text.content || 'Texte de contenu par défaut'">
            </p>
          </div>
        </div>

        <!-- Bouton Carte (masqué pendant édition) -->
        <RouterLink v-if="!isEditing" to="/map">
          <button class="btn btn-primary md:btn-md lg:btn-lg flex items-center gap-2">
            Carte des emplacements disponibles
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
              class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </RouterLink>
      </div>

      <div class="flex justify-center items-center w-full md:w-1/2"
        :class="{ 'border border-dashed border-primary': isEditing }">
        <div v-if="slides.length > 0"
          class="carousel w-full h-auto md:h-[400px] lg:h-[600px] rounded-lg overflow-hidden">
          <div v-for="(slide, index) in slides" :key="index" class="carousel-item relative w-full h-full" :class="{
            hidden: currentSlide !== index,
            flex: currentSlide === index,
          }">
            <img v-if="slide.id != 'add_img'" :src="slide.image_link" class="w-full h-full object-cover" />

            <div v-if="isEditing && slide.id == 'add_img'"
              class="w-full h-full flex items-center justify-center bg-gray-200">
              <figure class="w-full h-[400px] flex flex-col items-center justify-center bg-gray-200 rounded-lg">
                <button v-if="
                  (isEditing &&
                    editableImage?.index === '' &&
                    editableImage?.type === '') ||
                  (isEditing &&
                    editableImage?.index === 0 &&
                    editableImage?.type === 'faces_add')
                " @click="editImage(index, 'carousel')" class="bg-gray-200 bottom-5 left-5 z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-8 bg-gray-200">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <span class="text-gray-500 z-10" v-if="
                  (isEditing &&
                    editableImage?.index === '' &&
                    editableImage?.type === '') ||
                  (isEditing &&
                    editableImage?.index === 0 &&
                    editableImage?.type === 'faces_add')
                ">Aucune image enregistrée</span>
              </figure>
            </div>

            <div v-if="
              isEditing &&
              editableImage?.index === index &&
              editableImage?.type === 'carousel' &&
              slide.id == 'add_img'
            " class="absolute top-5 left-5 bg-white p-2 shadow rounded">
              <input type="text" v-model="slides[index].image_link" @blur="addImage(slides[index].image_link)"
                class="input input-sm" placeholder="Image URL" />
            </div>

            <div v-if="
              isEditing &&
              editableImage?.index === index &&
              editableImage?.type === 'carousel' &&
              slide.id != 'add_img'
            " class="absolute top-5 left-5 bg-white p-2 shadow rounded">
              <input type="text" v-model="slides[index].image_link" @blur="updateImage(slides[index].image_link)"
                class="input input-sm" placeholder="Image URL" />
            </div>
            <button v-if="isEditing && slide.id != 'add_img'" @click="editImage(index, 'carousel')"
              class="btn btn-sm absolute bottom-5 left-5"
              style="background-color: rgba(0, 0, 0, 0.6); color: white; font-weight: bold;">
              Modifier
            </button>

            <div v-if="slides.length > 1"
              class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button @click="prevSlide" class="btn btn-circle">❮</button>
              <button @click="nextSlide" class="btn btn-circle">❯</button>
            </div>
          </div>
        </div>

        <figure v-else class="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-lg">
          <span class="text-gray-500">Aucune image de carrousel n'est enregistrée actuellement</span>
        </figure>
      </div>
    </div>

    <!-- Title 2 -->
    <div class="flex flex-col items-center gap-y-6 relative z-40">
      <div>
        <div v-if="isEditing" class="flex items-center gap-2 mb-2">
          <button @click="saveField(1, 'Titre 2')" class="btn btn-sm bg-primary text-white hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M17 16v4H7v-4m10-10H7v4h10V6z" />
            </svg>
            Sauvegarder
          </button>
        </div>
        <div v-if="isEditing" class="w-full border border-dashed border-primary rounded p-4 bg-white z-40 relative">
          <quill-editor class="min-w-80 md:min-w-96" :options="editorOption" :content="title2.content"
            @change="onEditorChange('title2', $event)" />
        </div>
        <h1 v-else class="text-5xl font-bold text-center md:text-start lg:text-7xl"
          v-html="title2.content || 'Nos <span class=\'text-primary\'>faces</span> disponibles'">
        </h1>
      </div>
    </div>

    <div class="flex flex-row flex-wrap gap-6 justify-center md:justify-start relative z-40">
      <div v-if="faces.length > 0" class="flex flex-wrap gap-6 justify-center md:justify-start">
        <figure v-for="(face, index) in faces" :key="index"
          class="w-96 h-64 flex items-center justify-center bg-gray-200 rounded-t-lg relative"
          :class="{ 'border border-dashed border-primary': isEditing }">
          <img v-if="face.id != 'add_img'" :src="face.image_link" class="w-full h-full object-cover rounded-t-lg" />

          <figure v-if="face.id == 'add_img' && isEditing"
            class="w-full h-full flex flex-col items-center justify-center bg-gray-200 rounded-lg">
            <button v-if="
              (isEditing &&
                editableImage?.index === '' &&
                editableImage?.type === '') ||
              (isEditing &&
                editableImage?.index === 0 &&
                editableImage?.type === 'carousel_add')
            " @click="editImage('faces_add', 'faces_add')" class="bg-gray-200 bottom-5 left-5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-8 bg-gray-200">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <span v-if="
              (isEditing &&
                editableImage?.index === '' &&
                editableImage?.type === '') ||
              (isEditing &&
                editableImage?.index === 0 &&
                editableImage?.type === 'carousel_add')
            " class="text-gray-500">Aucune image enregistrée</span>
          </figure>
          <div v-if="
            isEditing &&
            editableImage?.index === 'faces_add' &&
            editableImage?.type === 'faces_add' &&
            face.id == 'add_img'
          " class="absolute top-5 left-5 bg-white p-2 shadow rounded">
            <input type="text" v-model="faces[index].image_link" @blur="addImage(faces[index].image_link)"
              class="input input-sm" placeholder="Image URL" />
          </div>

          <div v-if="
            isEditing &&
            editableImage?.index === index &&
            editableImage?.type === 'faces' &&
            face.id != 'add_img'
          " class="absolute top-5 left-5 bg-white p-2 shadow rounded">
            <input type="text" v-model="faces[index].image_link" @blur="updateImage(faces[index].image_link)"
              class="input input-sm" placeholder="Image URL" />
          </div>
          <button v-if="isEditing && face.id != 'add_img'" @click="editImage(index, 'faces')"
            class="btn btn-sm absolute bottom-5 left-5" style="
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
                font-weight: bold;
              ">
            Modifier
          </button>
        </figure>
      </div>

      <div v-else class="flex flex-wrap gap-6 justify-center md:justify-start">
        <figure class="w-96 h-64 flex items-center justify-center bg-gray-200 rounded-t-lg relative">
          <span class="text-gray-500">Aucune face n'est enregistrée actuellement</span>
        </figure>
      </div>
    </div>

  </div>
</template>

<style></style>
