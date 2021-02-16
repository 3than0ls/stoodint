import firebase from 'firebase'
import 'firebase/storage'
import firebaseConfig from './firebase.config.js'
import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      try {
        firebase.initializeApp(firebaseConfig)
      } catch (error) {
        console.log('Firebase initialization error', error.stack)
      }
    }
    this.firestore = firebase.firestore()
    this.storage = firebase.storage()
    this.auth = firebase.auth()
  }

  async signOut() {
    await this.auth.signOut()
    Cookies.remove('idToken')
  }

  async signInWithEmailAndPassword(email, password) {
    const userCreds = await this.auth.signInWithEmailAndPassword(
      email,
      password
    )
    const idToken = await this.auth.currentUser.getIdToken()
    Cookies.set('idToken', idToken)
  }

  async createSubject(subjectData) {
    if (subjectData.image) {
      subjectData.bannerImage = await this.uploadImage(
        'subjectBanner',
        subjectData.image
      )
      delete subjectData.image
    }
    const subjectID = shortid.generate()
    const data = await this.firestore
      .collection(`subjects`)
      .doc(subjectID)
      .set({
        ...subjectData,
        id: subjectID,
        authorID: this.auth.currentUser?.uid || 'anon',
      })
    return data
  }

  async createQuestionSet(subjectID, questionSetData) {
    // subject is the parent of question sets
    const parent = await this.firestore
      .collection('subjects')
      .doc(subjectID)
      .get()
    const subject = parent.data()
    // if there is a banner image supplied, otherwise just use parent banner
    if (questionSetData.image) {
      questionSetData.bannerImage = await this.uploadImage(
        'questionSetBanner',
        questionSetData.image
      )
      delete questionSetData.image
    } else {
      questionSetData.bannerImage = subject.bannerImage
    }
    const questionSetID = shortid.generate()
    const collection = this.firestore.collection(
      `subjects/${subjectID}/questionSets`
    )
    const data = await collection.doc(questionSetID).set({
      questions: {},
      authorID: this.auth.currentUser?.uid || 'anon',
      id: questionSetID,
      ...questionSetData,
    })
    return data
  }

  async getSubjects() {
    const data = await this.firestore.collection('subjects').get()
    const subjects = []
    for (let snapshot of data.docs) {
      subjects.push({ id: snapshot.id, ...snapshot.data() })
    }
    return subjects
  }

  async uploadImage(folder, file) {
    const snapshot = await this.storage
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
    const docRef = await this.firestore
      .collection(`questions`)
      .doc(questionSetID)
      .set(
        {
          [shortid.generate()]: {
            authorID: this.auth.currentUser?.uid || 'anon',
            question,
          },
        },
        { merge: true }
      )
    return docRef
  }
}

export default new Firebase()
