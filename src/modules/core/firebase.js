require('dotenv').config()
let request = require("request")
let config = require('@config/database')
var admin = require("firebase-admin")
let {private_key} = config,
    {project_id} = config,
    {client_email} = config

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.project_id,
    clientEmail: process.env.client_email,
    privateKey: process.env.private_key.replace(/\\n/g, '\n')
  }),
  databaseURL: "https://crows-755fd.firebaseio.com"
})

//new firebase cli
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
