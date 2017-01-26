let request = require("request")
let firebase = require('firebase')
let config = require('@config/database')

const firebaseApp = firebase.initializeApp(config)

class Firebase {
    
	constructor() {
		this._firebase = firebaseApp
        console.log(this._firebase.database())
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
