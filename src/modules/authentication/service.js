let firebase = require('@modules/core/firebase')

class AuthService extends firebase{

	getToken() {
		return require('@config/token')
	}

	verifyToken( token ) {
		return this._firebase.auth()
		.verifyIdToken( token )
		.then((response)=> {
			return {
				status: true,
				data: response
			}
		}).catch((error)=> {
			return {
				status: false,
				data: error
			}
		})
	}

	singup(email, password, name) {
		return this._firebase.auth().createUser({
			email: email,
			emailVerified: false,
			password: password,
			displayName: name,
			photoURL: "http://1plusx.com/app/mu-plugins/all-in-one-seo-pack-pro/images/default-user-image.png",
			disabled: false
		}).then((response)=>{
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
}
module.exports = AuthService
