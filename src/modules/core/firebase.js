let request = require("request")
let firebase = require('firebase')
let config = require('@config/database')

const firebaseApp = firebase.initializeApp(config)

class Firebase {
    
	constructor() {
		this._firebase = firebaseApp
	}

    get database () {
        return this._firebase.database()
    }

    get auth () {
        return this._firebase.auth()
    }
}
module.exports = Firebase
