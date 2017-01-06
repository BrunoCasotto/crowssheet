let firebase = require('@modules/core/firebase')

class AuthService extends firebase{

	login(email , password) {
		this._firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		return error
		})
		if(this._firebase.auth().currentUser) {
			return this._firebase.auth().currentUser
		} else {
			return false
		}
	}

	singup(email, password) {
		this._firebase.auth().createUserWithEmailAndPassword(email, password)
		.catch(function(error) {
			return error;
		})
		return true;
	}

	isSigned() {
		return this.user
	}

	test () {
		return 'ok'
	}
}
module.exports = AuthService
