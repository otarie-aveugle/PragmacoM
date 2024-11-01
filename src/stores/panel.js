import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const COLLECTION_ID = '67248edd003126d4a0e0'

export const usePanelStore = defineStore('panel', {
  state: () => ({
    panels: localStorage.getItem('panels'),
    currentPanel: {},
  }),
  actions: {
    getPanelById(documentId) {
      const total = this.panels.total
      const documents = this.panels.documents
      for (let i = 0; i < total; i++) {
        if (documents[i].$id === documentId) this.currentPanel = documents[i]
      }
    },
    async createPanel(document) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        document,
      )
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
    async deletePanel(DOCUMENT_ID) {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, DOCUMENT_ID)
    },
  },
})
