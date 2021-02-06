import admin from 'firebase-admin'
import serviceAccountConfig from './serviceAccount.js'
import shortid from 'shortid'

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

  async createQuestionSet(setData) {
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
