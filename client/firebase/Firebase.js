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
    const idToken = await this.auth.currentUser.getIdToken(true)
    Cookies.set('idToken', idToken, { expires: 365 })
  }

  async getSubjects() {
    const ref = this.firestore.collection('subjects')
    if (!this.auth.currentUser) {
      const data = await ref
        .where('private', '==', false)
        // .orderBy('created')
        .get()
      return data.docs.map((doc) => doc.data())
    }
    const data = await ref.orderBy('created').get()
    return data.docs.map((doc) => doc.data())
  }

  async getSubject(subjectID, getQuestionSets = false) {
    const subjectData = await this.firestore
      .collection('subjects')
      .doc(subjectID)
      .get()
    const subject = subjectData.data()
    if (!subject) {
      return null
    }

    if (getQuestionSets) {
      return { questionSets: await this.getQuestionSets(subjectID), ...subject }
    }
    return subject
  }

  async getQuestionSets(subjectID) {
    let questionSetsData
    if (!this.auth.currentUser) {
      questionSetsData = await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .where('private', '==', false)
        // .orderBy('created')
        .get()
    } else {
      questionSetsData = await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .orderBy('created')
        .get()
    }
    const questionSets = questionSetsData.docs.map((doc) => doc.data())
    return questionSets
  }

  async getQuestionSet(subjectID, questionSetID, getQuestions = false) {
    const questionSetData = await this.firestore
      .collection(`subjects/${subjectID}/questionSets`)
      .doc(questionSetID)
      .get()
    const questionSet = questionSetData.data()

    let questions
    if (getQuestions) {
      const questionsData = await this.firestore
        .collection(
          `subjects/${subjectID}/questionSets/${questionSetID}/questions`
        )
        .orderBy('created')
        .get()
      questions = questionsData.docs.map((doc) => doc.data())
    }

    if (questionSet) {
      if (getQuestions) {
        return { ...questionSet, questions }
      }
      return questionSet
    }
    return null
  }

  async getQuestions(subjectID, questionSetID) {
    const questionsData = await this.firestore
      .collection(
        `subjects/${subjectID}/questionSets/${questionSetID}/questions`
      )
      .orderBy('created')
      .get()
    const questions = questionsData.docs.map((doc) => doc.data())
    return questions || null
  }

  async uploadImage(folder, file) {
    const path = `${folder}/${uuidv4()}`

    const snapshot = await this.storage.ref().child(path).put(file)
    const downloadURL = await snapshot.ref.getDownloadURL()
    return { downloadURL, path }
  }

  async createSubject(subjectData) {
    if (subjectData.image) {
      subjectData.image = await this.uploadImage(
        'subjectBanner',
        subjectData.image
      )
    } else {
      subjectData.image = {
        downloadURL:
          'https://firebasestorage.googleapis.com/v0/b/stoodint-a9642.appspot.com/o/subjectBanner%2Fdefault.png?alt=media&token=4d3d18aa-2fbc-4795-9ce4-0efa2ad4d197',
        path: 'subjectBanner/default.png',
        default: true,
      }
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
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
    return subjectID
  }

  async createQuestionSet(subject, questionSetData) {
    // if there is a banner image supplied, otherwise just use parent subject banner
    if (questionSetData.image) {
      questionSetData.image = await this.uploadImage(
        'questionSetBanner',
        questionSetData.image
      )
    } else {
      questionSetData.image = { ...subject.image, default: true }
    }
    const questionSetID = shortid.generate()
    const collection = this.firestore.collection(
      `subjects/${subject.id}/questionSets`
    )
    await collection.doc(questionSetID).set({
      private: true,
      authorID: this.auth.currentUser?.uid || 'anon',
      id: questionSetID,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      ...questionSetData,
    })
    return questionSetID
  }

  async deleteSubjectOrQuestionSet(subjectID, questionSetID = null) {
    if (questionSetID === null) {
      const subject = await this.firestore
        .collection(`subjects`)
        .doc(subjectID)
        .get()

      const image = subject.get('image')
      if (!image.default) {
        await this.storage.ref().child(image.path).delete()
      }

      const questionSetsData = await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .get()
      const questionSetIDs = questionSetsData.docs.map((doc) => doc.data().id)
      for (const id of questionSetIDs) {
        await this.deleteSubjectOrQuestionSet(subjectID, id)
      }

      await this.firestore.collection(`subjects`).doc(subjectID).delete()
    } else {
      const questionSet = await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .doc(questionSetID)
        .get()

      const image = questionSet.get('image')
      if (!image.default) {
        await this.storage.ref().child(image.path).delete()
      }

      for (const questionID in questionSet.get('questions')) {
        await this.deleteQuestion(subjectID, questionSetID, questionID)
      }

      await this.firestore
        .collection(`subjects/${subjectID}/questionSets`)
        .doc(questionSetID)
        .delete()
    }
  }

  async setPrivate(subjectID, questionSetID = null, value = true) {
    if (questionSetID === null) {
      await this.firestore
        .collection(`subjects`)
        .doc(subjectID)
        .update({ private: value })
    } else {
      await this.firestore
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
    const questionRef = this.firestore.collection(
      `subjects/${subjectID}/questionSets/${questionSetID}/questions`
    )

    await questionRef.doc(questionID).set({
      authorID: this.auth.currentUser?.uid || 'anon',
      id: questionID,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      ...question,
    })
    return questionID
  }

  async createQuestionsFromJSON(json) {
    const obj = JSON.parse(json)
    const subjectID = obj.subjectID || '3EOeJUG_m'
    const questionSetID = obj.questionSetID || 'ejh1AiLR_'
    const questions = obj.questions

    const foo = async (question) => {
      return await this.createQuestion(subjectID, questionSetID, question)
    }
    try {
      await Promise.all(questions.map(async (question) => await foo(question)))
    } catch (err) {
      console.log(err)
    }
  }

  async deleteQuestion(subjectID, questionSetID, questionID) {
    const questionRef = this.firestore
      .collection(
        `subjects/${subjectID}/questionSets/${questionSetID}/questions`
      )
      .doc(questionID)

    const image = (await questionRef.get()).get('image')
    if (image) {
      await this.storage.ref().child(image.path).delete()
    }
    await questionRef.delete()
  }
}

export default new Firebase()
