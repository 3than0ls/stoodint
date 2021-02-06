import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const {
    query: { questionSet, question },
  } = req
  const data = await firebase.createQuestion(questionSet, JSON.parse(question))
  res.status(200).json(data)
}
