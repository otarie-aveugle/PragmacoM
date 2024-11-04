import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = '67248eb20017c1067937'
const COLLECTION_ID = '6728b0db00246c57aa58'

export const useContactStore = defineStore('contact', {
  state: () => ({
    messages: localStorage.getItem('messages'),
  }),
  actions: {
    async sendMessage(document) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        document,
      )
    },
    async getMessages() {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [],
      )
      this.messages = response
      localStorage.setItem('messages', response)
    },
    async deleteMessage(documentId) {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId)
      this.getMessages()
    },
  },
})
