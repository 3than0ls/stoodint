import firebaseAdmin from '~/firebase/FirebaseAdmin'

export default async (req, res) => {
  const { idToken } = req.cookies
  try {
    await firebaseAdmin.revokeToken(idToken)
    res.status(200).send('Logged out')
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}
