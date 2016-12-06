let firebase = require('@modules/core/firebase')

class AuthService {

	constructor() {
		this.bd = firebase
	}


	login (email, password) {
		return password
	}
}
module.exports = AuthService