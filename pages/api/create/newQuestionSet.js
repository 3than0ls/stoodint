import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const setData = req.body
  const data = await firebase.createQuestionSet(setData)
  res.status(200).json(data)
}
