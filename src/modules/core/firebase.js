require('dotenv').config()
let request = require("request")
var admin = require("firebase-admin")
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  databaseURL: process.env.DATABASEURL
})

class Firebase {
    
	constructor() {
		this._firebase = admin
	}

    get database () {
        return this._firebase.database()
    }

    get storage () {
        return this._firebase.storage()
    }

    get auth () {
        return this._firebase.auth()
    }
}
module.exports = Firebase
