import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const { questionSet, question } = req.body
  const data = await firebase.createQuestion(questionSet, question)
  res.status(200).json(data)
}
