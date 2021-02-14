import firebase from 'firebase'
import 'firebase/storage'
import firebaseConfig from './firebase.config.js'
import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      try {
        firebase.initializeApp(firebaseConfig)
      } catch (error) {
        console.log('Firebase initialization error', error.stack)
      }
    }
    this.firestore = firebase.firestore
    this.storage = firebase.storage
    this.auth = firebase.auth
  }

  async signOut() {
    await this.auth().signOut()
  }

  async signInWithEmailAndPassword(email, password) {
    const userCreds = await this.auth().signInWithEmailAndPassword(
      email,
      password
    )
  }

  async createQuestionSet(setData) {
    if (setData.image) {
      setData.bannerImage = await this.uploadImage('setBanners', setData.image)
      delete setData.image
    }
    const questionSetID = shortid.generate()
    await this.firestore()
      .collection(`questionSets`)
      .doc(questionSetID)
      .set({
        ...setData,
        questionSetID,
        authorID: this.auth().currentUser?.uid || 'anon',
      })
  }

  async getQuestionSets() {
    const data = await this.firestore().collection('questionSets').get()
    const questionSets = []
    for (let snapshot of data.docs) {
      questionSets.push({ questionSetID: snapshot.id, ...snapshot.data() })
    }
    return questionSets
  }

  async uploadImage(folder, file) {
    const snapshot = await this.storage()
      .ref()
      .child(`${folder}/${uuidv4()}`)
      .put(file)
    const downloadURL = await snapshot.ref.getDownloadURL()
    return downloadURL
  }

  async createQuestion(questionSetID, question) {
    if (question.image) {
      question.image = await this.uploadImage('questions', question.image)
    }
    const docRef = await this.firestore()
      .collection(`questions`)
      .doc(questionSetID)
      .set(
        {
          [shortid.generate()]: {
            authorID: this.auth().currentUser?.uid || 'anon',
            question,
          },
        },
        { merge: true }
      )
    return docRef
  }
}

export default new Firebase()
