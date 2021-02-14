import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const { email, password } = req.body
  try {
    const idToken = await firebase.signInWithEmailAndPassword({
      email,
      password,
    })
    res.status(200).send(idToken)
  } catch (err) {
    res.status(401).send(err.message)
  }
}
