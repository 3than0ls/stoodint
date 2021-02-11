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
        console.log('Firebase initialization error', error.stack)
      }
    }
    this.firestore = firebase.firestore
    this.storage = firebase.storage
    this.auth = firebase.auth
  }

  async signInWithEmailAndPassword(data) {
    const { email, password } = data
    const userCreds = await this.auth().signInWithEmailAndPassword(
      email,
      password
    )
    const idToken = await userCreds.user.getIdToken()
    return idToken
  }

  async uploadImage(folder, dataUrl) {
    const snapshot = await this.storage()
      .ref()
      .child(`${folder}/${uuidv4()}`)
      .putString(dataUrl, 'data_url')
    const downloadURL = await snapshot.ref.getDownloadURL()
    return downloadURL
  }

  async createQuestionSet(uid, setData) {
    if (setData.imageUrl) {
      setData.bannerImage = await this.uploadImage(
        'setBanners',
        setData.imageUrl
      )
      delete setData.imageUrl
    }
    const questionSetID = shortid.generate()
    await this.firestore()
      .collection(`questionSets`)
      .doc(questionSetID)
      .set({ ...setData, questionSetID, authorID: uid })
  }

  async getQuestionSets() {
    const data = await this.firestore().collection('questionSets').get()
    const questionSets = []
    for (let snapshot of data.docs) {
      questionSets.push({ questionSetID: snapshot.id, ...snapshot.data() })
    }
    return questionSets
  }

  async createQuestion(uid, questionSetID, question) {
    if (question.imageUrl) {
      question.image = await this.uploadImage('questions', question.imageUrl)
      delete question.imageUrl
    }
    const docRef = await this.firestore()
      .collection(`questions`)
      .doc(questionSetID)
      .set(
        { [shortid.generate()]: { authorID: uid, question } },
        { merge: true }
      )
    return docRef
  }
}

export default new Firebase()
