import firebase from '~/firebase/Firebase'
import firebaseAdmin from '~/firebase/FirebaseAdmin'

export default async (req, res) => {
  const { setData } = req.body
  const idToken = req.cookies.idToken
  try {
    const { uid } = await firebaseAdmin.verifyIdToken(idToken)
    const data = await firebase.createQuestionSet(uid, setData)
    res.status(200).json(data)
  } catch (err) {
    res.status(401).send(err.message)
  }
}
