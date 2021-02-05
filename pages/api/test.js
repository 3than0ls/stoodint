import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const {
    query: { collection, question },
  } = req
  // probably shuold split up the question into seperate query values rather than having it as a string JSON object which is then parsed
  const data = await firebase.createQuestion(
    collection || 'test',
    JSON.parse(question)
  )
  res.status(200).json(data)
}
