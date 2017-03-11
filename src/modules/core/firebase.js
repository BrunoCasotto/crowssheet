let request = require("request")
let config = require('@config/database')
var admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.cert(config),
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
