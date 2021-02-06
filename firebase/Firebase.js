import admin from 'firebase-admin'
import serviceAccountConfig from './serviceAccount.js'

class Firebase {
  constructor() {
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccountConfig),
        })
      } catch (error) {
        console.log('Firebase admin initialization error', error.stack)
      }
    }
    this.firestore = admin.firestore
  }

  async getCollection(collection) {
    const data = await this.firestore()
      .collections('questions')
      .collection(collection)
      .get()
    console.log(data)
  }

  async createQuestion(collection, question) {
    try {
      const docRef = await this.firestore()
        .collection('questions')
        .collection(collection)
        .add(question)
      console.log('Document written with ID: ', docRef.id)
    } catch (err) {
      console.error('Error adding document: ', err)
    }
    return docRef
  }
}

export default new Firebase()
