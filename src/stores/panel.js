import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const COLLECTION_ID = '67248edd003126d4a0e0'

export const usePanelStore = defineStore('panel', {
  state: () => ({
    panels: localStorage.getItem('panels'),
  }),
  actions: {
    async createPanel(document) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        document,
      )
      this.getPanels()
    },
    //TODO si on est pas connecté on ne peut pas récupérer la liste des panneaux
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
