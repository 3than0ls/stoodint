import * as admin from 'firebase-admin'
import firebaseAdminConfig from './firebaseAdmin.config.js'

class FirebaseAdmin {
  constructor() {
    if (!admin.apps.length) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert(firebaseAdminConfig),
        })
      } catch (error) {
        console.log('Firebase admin initialization error', error.stack)
      }
    }
    this.auth = admin.auth
  }

  async verifyIdToken(idToken) {
    const decodedToken = await this.auth().verifyIdToken(idToken, true)
    return decodedToken
  }

  async revokeToken(idToken) {
    const decodedToken = await this.verifyIdToken(idToken)
    await this.auth().revokeRefreshTokens(decodedToken.uid)
  }
}

export default new FirebaseAdmin()
