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
    const data = await this.firestore().collection(collection).get()
    console.log(data)
  }

  createQuestion(collection, question) {
    this.firestore()
      .collection(collection)
      .add(question)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id)
      })
      .catch((error) => {
        console.error('Error adding document: ', error)
      })
  }
}

export default new Firebase()
