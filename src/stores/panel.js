import { defineStore } from 'pinia'
import { databases, ID, storage } from '@/lib/appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_PANELS
const BUCKET_ID = import.meta.env.VITE_APPWRITE_BUCKET_ID

export const usePanelStore = defineStore('panel', {
  state: () => {
    let panels = {
      documents: [],
      total: 0,
    }
    const stored = localStorage.getItem('panels')
    if (stored) panels = JSON.parse(stored)
    return { panels }
  },
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
    async getPanelImage(fileId) {
      const response = await storage.getFileView(BUCKET_ID, fileId)
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
      if (response.total > 0) {
        this.panels = response
        localStorage.setItem('panels', JSON.stringify(this.panels))
      } else {
        this.panels = { documents: [], total: 0 }
        localStorage.removeItem('panels')
      }
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
