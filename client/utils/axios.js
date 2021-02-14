import axios from 'axios'
import Cookies from 'js-cookie'

class AxiosUtils {
  constructor() {}

  setIdToken(idToken) {
    Cookies.set('idToken', idToken, { expires: 90 })
    return idToken
  }

  getIdToken() {
    return Cookies.get('idToken')
  }

  deleteIdToken() {
    Cookies.remove('idToken')
  }

  async signInWithEmailAndPassword(data) {
    const response = await axios.post(`/api/auth/login`, data)
    const idToken = response.data
    this.setIdToken(idToken)
  }

  async signOut() {
    await axios.get(`/api/auth/logout`)
    this.deleteIdToken()
  }

  async createQuestionSet(setData) {
    await axios.post(`/api/create/newQuestionSet`, setData, {
      withCredentials: true,
    })
  }

  async createQuestion(questionSet, data) {
    await axios.post(
      `/api/create/newQuestion`,
      {
        questionSet,
        question: data,
      },
      { withCredentials: true }
    )
  }
}

export default new AxiosUtils()
