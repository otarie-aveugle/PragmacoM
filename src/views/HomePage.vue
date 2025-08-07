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
  <!-- Overlay gris quand mode édition activé -->
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

  <!-- Conteneur global -->
  <div class="mt-4 flex flex-col mx-4 gap-12">

    <!-- Bouton "Éditer la page" -->
    <div v-if="userLoggedIn && !isEditing" class="flex justify-end">
      <button @click="toggleEdit" class="btn btn-sm btn-outline btn-primary">
        Éditer la page
      </button>
    </div>

    <!-- === Bloc 1 + Bloc 2 (contenu texte + carrousel) === -->
    <div class="flex flex-col lg:flex-row gap-10 items-start relative z-40">

      <!-- === Bloc 1 : Titre, contenu, bouton (colonne gauche) === -->
      <div class="flex flex-col gap-6 w-full lg:w-1/2">

        <!-- Titre principal -->
        <div>
          <div v-if="isEditing" class="flex items-center gap-2 mb-2">
            <button @click="saveField(0, 'Titre 1')" class="btn btn-sm bg-primary text-white hover:bg-blue-600">
              Sauvegarder
            </button>
          </div>
          <div v-if="isEditing"
            class="w-full h-28 border border-dashed border-primary rounded p-4 bg-white z-40 relative">
            <quill-editor class="min-w-full" :options="editorOption" :content="title1.content"
              @change="onEditorChange('title1', $event)" />
          </div>
          <h1 v-else class="text-5xl font-bold text-center md:text-start lg:text-7xl"
            v-html="title1.content || 'Un panneau, <br /><span class=\'text-primary\'>1000</span> regards'">
          </h1>
        </div>

        <!-- Texte principal -->
        <div>
          <div v-if="isEditing" class="flex items-center gap-2 mb-2">
            <button @click="saveField(2, 'Contenu principal')"
              class="btn btn-sm bg-primary text-white hover:bg-blue-600">
              Sauvegarder
            </button>
          </div>
          <div v-if="isEditing"
            class="w-full h-48 border border-dashed border-primary rounded p-4 bg-white z-40 relative">
            <quill-editor class="min-w-full" :options="editorOption" :content="content_text.content"
              @change="onEditorChange('content_text', $event)" />
          </div>
          <p v-else class="text-lg text-gray-700 leading-relaxed md:text-2xl"
            v-html="content_text.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla lacinia semper. Fusce blandit nunc tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed mattis mollis eros, nec consequat quam sollicitudin a. Curabitur posuere tristique neque non sagittis. In ac maximus ex. Nulla porttitor laoreet nisl, porttitor tempus sapien posuere a. Curabitur lobortis ex eget purus tempor, at tempus orci facilisis. Duis dapibus fermentum scelerisque. Nulla facilisi. Vivamus sit amet gravida sapien, quis ultrices sapien. Integer efficitur arcu mi, sed semper ipsum fermentum lobortis. Nam ornare, tortor id fringilla aliquam, leo lacus pulvinar mauris, eu pretium ipsum orci id est. Aliquam at elit id arcu euismod dictum. Nam blandit dui id odio viverra ornare.'">
          </p>
        </div>

        <!-- Bouton carte -->
        <div>
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
      </div>

      <!-- === Bloc 2 : Carrousel (colonne droite) === -->
      <div class="w-full lg:w-1/2 flex justify-center items-center"
        :class="{ 'border border-dashed border-primary': isEditing }">

        <!-- Carrousel -->
        <div v-if="slides.length > 0"
          class="carousel w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">

          <!-- Slide -->
          <div v-for="(slide, index) in slides" :key="index" class="carousel-item relative w-full h-full"
            :class="{ hidden: currentSlide !== index, flex: currentSlide === index }">

            <!-- Image normale -->
            <img v-if="slide.id != 'add_img'" :src="slide.image_link" class="w-full h-full object-cover" />

            <!-- Slide vide (ajout image) -->
            <div v-if="isEditing && slide.id == 'add_img'"
              class="w-full h-full flex items-center justify-center bg-gray-200">
              <figure class="w-full h-[400px] flex flex-col items-center justify-center bg-gray-200 rounded-lg">
                <button @click="editImage(index, 'carousel')" class="bg-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                </button>
                <span class="text-gray-500 z-10">Aucune image enregistrée</span>
              </figure>
            </div>

            <!-- Input d'ajout ou modification image -->
            <div v-if="isEditing && editableImage?.index === index && editableImage?.type === 'carousel'"
              class="absolute top-5 left-5 bg-white p-2 shadow rounded">
              <input type="text" v-model="slides[index].image_link"
                @blur="slide.id == 'add_img' ? addImage(slides[index].image_link) : updateImage(slides[index].image_link)"
                class="input input-sm" placeholder="Image URL" />
            </div>

            <!-- Bouton modifier -->
            <button v-if="isEditing && slide.id != 'add_img'" @click="editImage(index, 'carousel')"
              class="btn btn-sm absolute bottom-5 left-5"
              style="background-color: rgba(0, 0, 0, 0.6); color: white; font-weight: bold;">
              Modifier
            </button>

            <!-- Flèches de navigation -->
            <div v-if="slides.length > 1"
              class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
              <button @click="prevSlide" class="btn btn-circle">❮</button>
              <button @click="nextSlide" class="btn btn-circle">❯</button>
            </div>
          </div>
        </div>

        <!-- Aucune image -->
        <figure v-else class="w-full h-[400px] flex items-center justify-center bg-gray-200 rounded-lg">
          <span class="text-gray-500">Aucune image de carrousel</span>
        </figure>
      </div>
    </div>

    <!-- === Bloc 3 : Titre + Faces === -->
    <div class="flex flex-col gap-y-6 relative z-40">

      <!-- Titre 2 centré -->
      <div class="w-1/2 mx-auto">
        <div v-if="isEditing" class="flex justify-start mb-2">
          <button @click="saveField(1, 'Titre 2')" class="btn btn-sm bg-primary text-white hover:bg-blue-600">
            Sauvegarder
          </button>
        </div>
        <div v-if="isEditing" class="h-28 border border-dashed border-primary rounded p-4 bg-white z-40 relative">
          <quill-editor class="min-w-full" :options="editorOption" :content="title2.content"
            @change="onEditorChange('title2', $event)" />
        </div>
        <h2 v-else class="text-5xl font-bold text-center md:text-start lg:text-7xl"
          v-html="title2.content || 'Nos <span class=\'text-primary\'>faces</span> disponibles'"></h2>
      </div>

      <!-- Liste des faces (stacked, responsive) -->
      <div class="flex flex-row flex-wrap gap-6 justify-center md:justify-start">
        <figure v-for="(face, index) in faces" :key="index"
          class="w-96 max-w-5xl mx-auto h-64 bg-gray-200 rounded-t-lg relative overflow-hidden flex justify-center items-center"
          :class="{ 'border border-dashed border-primary': isEditing }">

          <!-- Image face -->
          <img v-if="face.id != 'add_img'" :src="face.image_link" class="w-full h-full object-cover rounded-t-lg" />

          <!-- Ajout image (vide) -->
          <figure v-if="face.id == 'add_img' && isEditing"
            class="w-full h-full flex flex-col items-center justify-center bg-gray-200 rounded-lg">
            <button @click="editImage('faces_add', 'faces_add')" class="bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>
            <span class="text-gray-500">Aucune image enregistrée</span>
          </figure>

          <!-- Formulaires d'ajout / modif -->
          <div
            v-if="isEditing && editableImage?.index === index && editableImage?.type === 'faces' && face.id != 'add_img'"
            class="absolute top-5 left-5 bg-white p-2 shadow rounded">
            <input type="text" v-model="faces[index].image_link" @blur="updateImage(faces[index].image_link)"
              class="input input-sm" placeholder="Image URL" />
          </div>

          <div v-if="isEditing && editableImage?.index === 'faces_add' && editableImage?.type === 'faces_add'"
            class="absolute top-5 left-5 bg-white p-2 shadow rounded">
            <input type="text" v-model="faces[index].image_link" @blur="addImage(faces[index].image_link)"
              class="input input-sm" placeholder="Image URL" />
          </div>

          <!-- Bouton modifier -->
          <button v-if="isEditing && face.id != 'add_img'" @click="editImage(index, 'faces')"
            class="btn btn-sm absolute bottom-5 left-5"
            style="background-color: rgba(0, 0, 0, 0.6); color: white; font-weight: bold;">
            Modifier
          </button>
        </figure>
      </div>
    </div>
  </div>
</template>

<style></style>
