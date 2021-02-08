import firebase from 'firebase'
import 'firebase/storage'
import firebaseConfig from './firebase.config.js'
import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'
import './polyfill.js'

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
    this.storage = firebase.storage
  }

  async uploadImage(folder, dataUrl) {
    const snapshot = await this.storage()
      .ref()
      .child(`${folder}/${uuidv4()}`)
      .putString(dataUrl, 'data_url')
    const downloadURL = await snapshot.ref.getDownloadURL()
    return downloadURL
  }

  async createQuestionSet(setData) {
    if (setData.imageUrl) {
      setData.bannerImage = await this.uploadImage(
        'setBanners',
        setData.imageUrl
      )
      delete setData.imageUrl
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
    if (question.imageUrl) {
      question.image = await this.uploadImage('questions', question.imageUrl)
      delete question.imageUrl
    }
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
