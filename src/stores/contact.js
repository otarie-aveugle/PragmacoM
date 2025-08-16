import { defineStore } from 'pinia'
import { databases, ID } from '@/lib/appwrite'

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID_MESSAGES

export const useContactStore = defineStore('contact', {
  state: () => {
    let messages = {
      documents: [],
      total: 0,
    }
    const stored = localStorage.getItem('messages')
    if (stored) messages = JSON.parse(stored)
    return { messages }
  },
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
      if (response.total > 0) {
        this.messages = response
        localStorage.setItem('messages', JSON.stringify(this.messages))
      } else {
        this.messages = { documents: [], total: 0 }
        localStorage.removeItem('messages')
      }
    },
    async deleteMessage(documentId) {
      await databases.deleteDocument(DATABASE_ID, COLLECTION_ID, documentId)
      this.getMessages()
    },
  },
})
