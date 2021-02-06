import axios from 'axios'

class AxiosUtils {
  constructor() {}

  async createQuestionSet(setData) {
    try {
      await axios.post(`/api/create/newQuestionSet`, null, {
        params: { setData },
      })
    } catch (err) {
      console.log('Axios Utils Error:', err)
    }
  }

  async createQuestion(questionSet, data) {
    try {
      await axios.post(`/api/create/newQuestion`, null, {
        params: { questionSet, question: data },
      })
    } catch (err) {
      console.log('Axios Utils Error:', err)
    }
  }
}

export default new AxiosUtils()
