import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = '673db72d00269c663b43'
const SLIDES_COLLECTION_ID = '673db7420001d4f50e82'
const FACES_COLLECTION_ID = '673db73e0022b560282c'
const CONTENT_COLLECTION_ID = '673db738002199b2a2f7'

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
    contentData: [],
    title1: {
      id: '',
      type: 'title1',
      content: '',
    }, //index 0
    title2: {
      id: '',
      type: 'title2',
      content: '',
    }, //index 1
    content_text: {
      id: '',
      type: 'content_text',
      content: '',
    }, //index 2
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
        const contentData = await databases.listDocuments(
          DATABASE_ID,
          CONTENT_COLLECTION_ID,
        )
        if (contentData.total > 0) {
          contentData.documents.forEach(element => {
            if (element.type === 'title1') this.title1 = element
            if (element.type === 'title2') this.title2 = element
            if (element.type === 'content_text') this.content_text = element
          })
        } else {
          this.title1 = {
            id: '',
            type: 'title1',
            content: '',
          }
          this.title2 = {
            id: '',
            type: 'title2',
            content: '',
          }
          this.content_text = {
            id: '',
            type: 'content_text',
            content: '',
          }
        }
        this.contentData = contentData
        this.slides = slidesData.documents.map(doc => ({
          id: doc.$id,
          image_link: doc.image_link,
        }))
        this.faces = facesData.documents.map(doc => ({
          id: doc.$id,
          image_link: doc.image_link,
        }))
      } catch (error) {
        console.error('Error fetching content:', error)
      }
    },

    async updateContentData(index) {
      let content = {
        id: '',
        type: '',
        content: '',
      }
      if (index === 0) {
        content = this.title1
      } else if (index === 1) {
        content = this.title2
        console.log('title2 content : ', content)
      } else if (index === 2) {
        content = this.content_text
      } else {
        return 0
      }

      if (content.content != '') {
        const dataExist = false
        for (const element in this.contentData) {
          if (element.type == content.type && element.content) {
            dataExist == true
          }
        }
        console.log('dataExist : ', dataExist)
        if (dataExist) {
          try {
            const result = await databases.updateDocument(
              DATABASE_ID,
              CONTENT_COLLECTION_ID,
              content.$id,
              {
                type: content.type,
                content: content.content,
              },
            )
            console.log('result update : ', result)
          } catch (error) {
            console.error(error)
          }
        } else {
          console.log('content : ', content)
          try {
            const result = await databases.createDocument(
              DATABASE_ID,
              CONTENT_COLLECTION_ID,
              ID.unique(),
              {
                type: content.type,
                content: content.content,
              },
            )
            console.log('result create: ', result)
          } catch (error) {
            console.error(error)
          }
        }
      }
    },

    toggleAddImg() {
      if (this.isEditing) {
        this.slides.push({ id: 'add_img', image_link: '' }) //add image
        this.faces.push({ id: 'add_img', image_link: '' }) //add image
      } else {
        this.slides.pop() //remove last slide 'add_img'
        this.faces.pop() //remove last faces 'add_img'
      }
    },

    toggleSlideToAddImg() {
      let index = 0
      while (
        index < this.slides.length &&
        this.slides[index].id !== 'add_img'
      ) {
        this.nextSlide()
        index++
      }
    },

    toggleEdit() {
      this.isEditing = !this.isEditing
      this.toggleAddImg()
      this.toggleSlideToAddImg()
      if (!this.isEditing) window.location.reload()
    },

    editImage(index, type) {
      this.editableImage = { index, type }
    },

    async addImage(url) {
      if (typeof url === 'string' && url) {
        try {
          if (this.editableImage) {
            const { index, type } = this.editableImage
            if (type === 'carousel' || type === 'carousel_add') {
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
      this.toggleAddImg()
    },

    async updateImage(newUrl) {
      if (typeof newUrl === 'string') {
        if (newUrl.length > 0) {
          //update
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
            }
          } catch (error) {
            console.error('Error updating image:', error)
          }
        } else {
          if (newUrl === '') {
            //delete
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
        this.toggleAddImg()
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
