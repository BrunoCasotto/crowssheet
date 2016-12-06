let request = require("request")
let bd = require('firebase')
let config = require('@config/database')
const firebaseApp = bd.initializeApp(config)

class Firebase {

	constructor() {
		this._base_path = ''
		this.create_rules = {}
	}

	
}
module.exports = new Firebase()