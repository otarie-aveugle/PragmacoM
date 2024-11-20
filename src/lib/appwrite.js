import { Client, Account, Databases, Storage } from 'appwrite'

export const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('673c926d00383fb473c2')

export const databases = new Databases(client)
export const account = new Account(client)
export const storage = new Storage(client)
export { ID } from 'appwrite'
