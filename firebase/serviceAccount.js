require('dotenv').config()

// should proabbly split up the service account rather than having it as a JSON string
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_JSON)
export default serviceAccount
