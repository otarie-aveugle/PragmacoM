import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const COLLECTION_ID = '67248edd003126d4a0e0'

export const usePanelStore = defineStore('panel', {
  state: () => ({}),
  actions: {
    async createPanel(document) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        document,
      )
    },
    
  },
})
