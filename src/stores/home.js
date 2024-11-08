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
    newSlides: [
      {
        image_link: '',
      },
    ],
    newFaces: [
      {
        image_link: '',
      },
    ],
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

        console.log('fetchContent call')
        console.log('slidesData : ', slidesData)
        console.log('facesData : ', facesData)
        this.slides = slidesData.documents.map(doc => ({
          id: doc.$id,
          image_link: doc.image_link,
        }))
        this.faces = facesData.documents.map(doc => ({
          id: doc.$id,
          image_link: doc.image_link,
        }))
        console.log('slides : ', this.slides)
      } catch (error) {
        console.error('Error fetching content:', error)
      }
    },

    toggleEdit() {
      this.isEditing = !this.isEditing
      if (this.isEditing) {
        console.log('[EDITION] ON')
      } else {
        console.log('[EDITION] OFF')
      }
      console.log('----------')
      console.log('slides : ', this.slides)
      console.log('faces : ', this.faces)
      console.log('slides.lenght : ', this.slides.length)
      console.log('faces.lenght : ', this.faces.length)
      if (this.isEditing) {
        this.slides.push({ id: 'add_img', image_link: '' }) //add image
        this.faces.push({ id: 'add_img', image_link: '' }) //add image
      } else {
        this.slides.pop() //remove last slide 'add_img'
        this.faces.pop() //remove last faces 'add_img'
      }
      console.log('slides : ', this.slides)
      console.log('faces : ', this.faces)
      console.log('slides.lenght : ', this.slides.length)
      console.log('faces.lenght : ', this.faces.length)
      console.log('----------')
    },

    editImage(index, type) {
      this.editableImage = { index, type }
      console.log('editableImage : ', this.editableImage)
    },

    async addImage(url) {
      console.log('addImage url : ', url)
      if (typeof url === 'string' && url) {
        try {
          if (this.editableImage) {
            const { index, type } = this.editableImage
            if (type === 'carousel' || type === 'carousel_add') {
              console.log('carousel url : ', url)
              await databases.createDocument(
                DATABASE_ID,
                SLIDES_COLLECTION_ID,
                ID.unique(),
                {
                  image_link: url,
                },
              )
              this.slides[index] = { image_link: url }
            } else if (type === 'faces' || type === 'faces_add') {
              console.log('faces url : ', url)
              await databases.createDocument(
                DATABASE_ID,
                FACES_COLLECTION_ID,
                ID.unique(),
                {
                  image_link: url,
                },
              )
              this.faces[index] = { image_link: url }
            }
          }
        } catch (error) {
          console.error('Error adding image:', error)
        }
      }
      await this.fetchContent()
      this.editableImage = {
        index: '',
        type: '',
      }
      this.newSlides = [{ image_link: '' }]
      this.newFaces = [{ image_link: '' }]
    },

    async updateImage(newUrl) {
      console.log('updateImage newUrl : ', newUrl)
      if (typeof newUrl === 'string') {
        if (newUrl.length > 0) {
          //update
          console.log('update method')
          try {
            if (this.editableImage) {
              const { index, type } = this.editableImage
              if (type === 'carousel') {
                const documentId = this.slides[index].id
                console.log('update carousel documentId : ', documentId)
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
                console.log('update faces documentId : ', documentId)
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
            }
          } catch (error) {
            console.error('Error updating image:', error)
          }
        } else {
          if (newUrl === '') {
            //delete
            console.log('delete method')
            try {
              if (this.editableImage) {
                const { index, type } = this.editableImage
                if (type === 'carousel') {
                  const documentId = this.slides[index].id
                  await databases.deleteDocument(
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
                  await databases.deleteDocument(
                    DATABASE_ID,
                    FACES_COLLECTION_ID,
                    documentId,
                    {
                      image_link: newUrl,
                    },
                  )
                  this.faces[index].image_link = newUrl
                }
              }
            } catch (error) {
              console.error('Error deleting image:', error)
            }
          }
        }
        await this.fetchContent()
        this.editableImage = {
          index: '',
          type: '',
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
