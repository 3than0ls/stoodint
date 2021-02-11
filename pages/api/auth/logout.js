import firebaseAdmin from '~/firebase/FirebaseAdmin'

export default async (req, res) => {
  const { idToken } = req.cookies
  console.log(`${idToken} attempting log out`)
  try {
    await firebaseAdmin.revokeToken(idToken)
    res.status(200).send('Logged out')
  } catch (err) {
    res.status(500).send(err)
  }
}
