import { defineStore } from 'pinia'
import { databases, ID, storage } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const COLLECTION_ID = '67248edd003126d4a0e0'
const BUCKET_ID = '6729f24a000edbe08ba8'

export const usePanelStore = defineStore('panel', {
  state: () => ({
    panels: localStorage.getItem('panels'),
  }),
  actions: {
    //methods for bucket
    async addPanelImage(imageFile) {
      const response = await storage.createFile(
        BUCKET_ID,
        ID.unique(),
        imageFile,
      )
      return response
    },
    async deletePanelImage(fileId) {
      await storage.deleteFile(BUCKET_ID, fileId)
    },
    async updatePanelImage(oldFileId, newImageFile) {
      //delete and create are used here because update storage method is only for the fileName
      await this.deletePanelImage(oldFileId)
      const response = await this.addPanelImage(newImageFile)
      return response
    },
    //methods for db
    async createPanel(document) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        document,
      )
      this.getPanels()
    },
    async getPanels() {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [],
      )
      this.panels = response
      localStorage.setItem('panels', response)
    },
    async getPanelById(documentId) {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
      )
      return response
    },
    async updatePanel(documentId, updatedData) {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        documentId,
        updatedData,
      )
      this.getPanels()
    },
    async deletePanel(documentId) {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId)
      this.getPanels()
    },
  },
})
