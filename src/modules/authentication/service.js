let firebase = require('@modules/core/firebase')

class AuthService extends firebase{

	getToken() {
		return require('@config/database')
	}
	
	login(email, password) {
		return this._firebase.auth().signInWithEmailAndPassword(email, password)
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

	singout() {
		return this._firebase.auth().signOut()
		.then((response)=> {
			return {
				status: true,
				data: response
			}
		}).catch((error)=>{
			return {
				status: false,
				data: error
			}
		})
	}

	singup(email, password, name) {
		console.log(name)
		return this._firebase.auth().createUserWithEmailAndPassword(email, password)
		.then((response)=>{
			response.updateProfile({
				displayName: name
			}).then((response)=> {
				return { 
					status: true,
					data: response
				}
			}, (error)=> {
				
			})
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
