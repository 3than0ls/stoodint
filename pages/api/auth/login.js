import firebase from '~/firebase/Firebase'

export default async (req, res) => {
  const { email, password } = req.body
  console.log(`${email} attempting log in`)
  try {
    const idToken = await firebase.signInWithEmailAndPassword({
      email,
      password,
    })
    console.log(`${email} has logged in`)
    res.status(200).send(idToken)
  } catch (err) {
    res.status(401).send(err.message)
  }
}
