// import admin from 'firebase-admin'
import serviceAccountConfig from './serviceAccount.js'
import firebase from 'firebase'
import 'firebase/storage'
import firebaseConfig from './firebase.config.js'
import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      try {
        // admin.initializeApp({
        //   credential: admin.credential.cert(serviceAccountConfig),
        // })
        firebase.initializeApp(firebaseConfig)
      } catch (error) {
        console.log('Firebase admin initialization error', error.stack)
      }
    }
    this.firestore = firebase.firestore
    // this.storage = firebase.storage()
  }

  async uploadImage() {}

  async createQuestionSet(setData) {
    console.log(file, setData)

    if (setData.image) {
      console.log('uploading file')
      setData.image = await this.uploadImage(file)
    }
    try {
      const id = shortid.generate()
      await this.firestore().collection(`questionSets`).doc(id).set(setData)
      // below is just to fill up the thing, just a placeholder
      await this.createQuestion(id, {
        tempPlaceholderKey: 'tempPlaceholderValue',
      })
    } catch (err) {
      console.error('Error adding document: ', err)
    }
  }

  async getQuestionSets() {
    const data = await this.firestore().collection('questionSets').get()
    const questionSets = []
    for (let snapshot of data.docs) {
      questionSets.push({ questionSetID: snapshot.id, ...snapshot.data() })
    }
    return questionSets
  }

  async createQuestion(questionSetID, question) {
    try {
      const docRef = await this.firestore()
        .collection(`questionSets/${questionSetID}/questions`)
        .add(question)
      return docRef
    } catch (err) {
      console.error('Error adding document: ', err)
    }
  }
}

export default new Firebase()
