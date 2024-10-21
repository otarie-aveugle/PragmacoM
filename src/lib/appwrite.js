import { Client, Account } from 'appwrite'

export const client = new Client()

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6713c15e00218d71e784')

export const account = new Account(client)
export { ID } from 'appwrite'
