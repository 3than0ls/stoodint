require('dotenv').config()

const firebaseAdminConfig = JSON.parse(process.env.SERVICE_ACCOUNT_JSON)

export default firebaseAdminConfig
