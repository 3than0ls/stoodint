import firebase from 'firebase'
import 'firebase/storage'
import shortid from 'shortid'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import firebaseConfig from './firebase.config.js'

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
    await this.auth.signInWithEmailAndPassword(email, password)
    const idToken = await this.auth.currentUser.getIdToken()
    Cookies.set('idToken', idToken, { expires: 365 })
  }

  async getSubjects() {
    const data = await this.firestore.collection('subjects').get()
    return data.docs.map((doc) => doc.data())
  }

  async getSubject(subjectID) {
    const subjectData = await this.firestore
      .collection('subjects')
      .doc(subjectID)
      .get()
    const subject = subjectData.data()
    const questionSetsData = await this.firestore
      .collection(`subjects/${subjectID}/questionSets`)
      .get()
    const questionSets = questionSetsData.docs.map((doc) => doc.data())
    if (subject) {
      const data = { questionSets, ...subject }
      return data
    }
    return null
  }

  async getQuestionSet(subjectID, questionSetID) {
    const questionSetData = await this.firestore
      .collection(`subjects/${subjectID}/questionSets`)
      .doc(questionSetID)
      .get()
    const questionSet = questionSetData.data()
    if (questionSet) {
      return [await this.getSubject(subjectID), questionSet]
    }
    return null
  }

  async uploadImage(folder, file) {
    const snapshot = await this.storage
      .ref()
      .child(`${folder}/${uuidv4()}`)
      .put(file)
    const downloadURL = await snapshot.ref.getDownloadURL()
    return downloadURL
  }

  async createSubject(subjectData) {
    if (subjectData.image) {
      subjectData.bannerImage = await this.uploadImage(
        'subjectBanner',
        subjectData.image
      )
      delete subjectData.image
    } else {
      delete subjectData.image
      subjectData.bannerImage =
        'https://firebasestorage.googleapis.com/v0/b/stoodint-a9642.appspot.com/o/subjectBanner%2Fdefault.png?alt=media&token=4d3d18aa-2fbc-4795-9ce4-0efa2ad4d197'
    }
    const subjectID = shortid.generate()
    await this.firestore
      .collection(`subjects`)
      .doc(subjectID)
      .set({
        ...subjectData,
        id: subjectID,
        authorID: this.auth.currentUser?.uid || 'anon',
        private: true,
      })
    return subjectID
  }

  async createQuestionSet(subject, questionSetData) {
    // if there is a banner image supplied, otherwise just use parent subject banner
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
      `subjects/${subject.id}/questionSets`
    )
    await collection.doc(questionSetID).set({
      questions: [],
      counter: 0,
      private: true,
      authorID: this.auth.currentUser?.uid || 'anon',
      id: questionSetID,
      ...questionSetData,
    })
    return questionSetID
  }

  async deleteSubjectOrQuestionSet(subjectID, questionSetID = null) {
    if (questionSetID === null) {
      const subject = await this.firestore
        .collection(`subjects`)
        .doc(subjectID)
        .delete()
    } else {
      const collection = await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .doc(questionSetID)
        .delete()
    }
  }

  async setPrivate(subjectID, questionSetID = null, value = true) {
    if (questionSetID === null) {
      console.log(subjectID, questionSetID, value)
      const collection = await this.firestore
        .collection(`subjects`)
        .doc(subjectID)
        .update({ private: value })
    } else {
      const collection = await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .doc(questionSetID)
        .update({ private: value })
    }
  }

  async createQuestion(subjectID, questionSetID, question) {
    if (question.image) {
      question.image = await this.uploadImage('questions', question.image)
    }
    const questionID = shortid.generate()
    const docRef = this.firestore
      .collection(`subjects/${subjectID}/questionSets`)
      .doc(questionSetID)
    const { counter } = (await docRef.get()).data()
    await docRef.update({
      [`questions.${questionID}`]: {
        order: counter,
        ...question,
      },
      counter: firebase.firestore.FieldValue.increment(1),
    })

    return questionID
  }

  async deleteQuestion(subjectID, questionSetID, questionID) {
    const docRef = this.firestore
      .collection(`subjects/${subjectID}/questionSets`)
      .doc(questionSetID)
    await docRef.update({
      [`questions.${questionID}`]: firebase.firestore.FieldValue.delete(),
    })
  }
}

export default new Firebase()
