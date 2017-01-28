let firebase = require('@modules/core/firebase')

class AuthService extends firebase{

	getToken() {
		return require('@config/database')
	}
	
	login(email, password) {
		return this._firebase.auth().signInWithEmailAndPassword(email, password)
		.then((response)=>{
			console.log(response)
			return {
				status: true,
				data: response
			 }
		})
		.catch((error)=> {
			return { 
				status: false,
				data: error
			 }
		})
	}

	singup(email, password) {
		return this._firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((response)=>{
			return { 
				status: true,
				data: response
			 }
		})
		.catch((error)=> {
			return { 
				status: false,
				data: error
			 }
		})
	}

	isSigned() {
		return new Promise( (resolve, reject) => {
			resolve(this._firebase.auth().currentUser)
		})
	}
}
module.exports = AuthService
