import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const {
    query: { setData },
  } = req
  const data = await firebase.createQuestionSet(JSON.parse(setData))
  res.status(200).json(data)
}
