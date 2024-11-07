import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const SLIDES_COLLECTION_ID = '672b437d00367fdf47ea'
const FACES_COLLECTION_ID = '672b4553001da9498403'

export const useHomeStore = defineStore('home', {
  state: () => ({
    isEditing: false,
    editableImage: {
      index: '',
      type: '',
    },
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

        this.slides = slidesData.documents.map(doc => ({
          image_link: doc.image_link,
        }))
        this.faces = facesData.documents.map(doc => ({
          image_link: doc.image_link,
        }))
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

    async addImage(url) {
      if (typeof url === 'string' && url) {
        try {
          if (this.editableImage) {
            const { index, type } = this.editableImage
            if (type === 'carousel') {
              await databases.createDocument(
                DATABASE_ID,
                SLIDES_COLLECTION_ID,
                ID.unique(),
                {
                  image_link: url,
                },
              )
              this.slides[index].image_link = url
            } else if (type === 'faces') {
              await databases.createDocument(
                DATABASE_ID,
                FACES_COLLECTION_ID,
                ID.unique(),
                {
                  image_link: url,
                },
              )
              this.faces[index].image_link = url
            }
            this.editableImage = null
          }
        } catch (error) {
          console.error('Error adding image:', error)
        }
      }
      this.editableImage = {
        index: '',
        type: '',
      }
    },

    async updateImage(newUrl) {
      if (typeof newUrl === 'string' && newUrl) {
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
                  image_link: newUrl,
                },
              )
              this.slides[index].image_link = newUrl
            } else if (type === 'faces') {
              const documentId = this.faces[index].id
              await databases.updateDocument(
                DATABASE_ID,
                FACES_COLLECTION_ID,
                documentId,
                {
                  image_link: newUrl,
                },
              )
              this.faces[index].image_link = newUrl
            }
            this.editableImage = null
          }
        } catch (error) {
          console.error('Error updating image:', error)
        }
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
