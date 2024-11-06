import { defineStore } from 'pinia'
import { databases } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const SLIDES_COLLECTION_ID = '672b437d00367fdf47ea'
const FACES_COLLECTION_ID = '672b4553001da9498403'

export const useHomeStore = defineStore('home', {
  state: () => ({
    isEditing: false,
    editableImage: null,
    currentSlide: 0,
    slides: [],
    faces: [],
  }),

  actions: {
    async fetchContent() {
      try {
        const slidesData = await databases.listDocuments(
          DATABASE_ID,
          SLIDES_COLLECTION_ID,
        )
        const facesData = await databases.listDocuments(
          DATABASE_ID,
          FACES_COLLECTION_ID,
        )

        this.slides = slidesData.documents.map(doc => ({ image: doc.image }))
        this.faces = facesData.documents.map(doc => ({ image: doc.image }))
      } catch (error) {
        console.error('Error fetching content:', error)
      }
    },

    toggleEdit() {
      this.isEditing = !this.isEditing
    },

    editImage(index, type) {
      this.editableImage = { index, type }
    },

    async updateImage(newUrl) {
      try {
        if (this.editableImage) {
          const { index, type } = this.editableImage
          if (type === 'carousel') {
            const documentId = this.slides[index].id
            await databases.updateDocument(
              DATABASE_ID,
              SLIDES_COLLECTION_ID,
              documentId,
              {
                image: newUrl,
              },
            )
            this.slides[index].image = newUrl
          } else if (type === 'faces') {
            const documentId = this.faces[index].id
            await databases.updateDocument(
              DATABASE_ID,
              FACES_COLLECTION_ID,
              documentId,
              {
                image: newUrl,
              },
            )
            this.faces[index].image = newUrl
          }
          this.editableImage = null
        }
      } catch (error) {
        console.error('Error updating image:', error)
      }
    },

    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length
    },

    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.slides.length) % this.slides.length
    },
  },
})
