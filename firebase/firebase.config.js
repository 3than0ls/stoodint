require('dotenv').config()

// should proabbly split up the service account rather than having it as a JSON string
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG_JSON)
export default firebaseConfig
