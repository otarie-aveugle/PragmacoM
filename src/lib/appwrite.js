import { Client, Account, Databases, Storage } from 'appwrite'

export const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('6713c15e00218d71e784')

export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client)
export { ID } from 'appwrite'
