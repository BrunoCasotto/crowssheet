let firebase = require('@modules/core/firebase')
let serviceCore = require("@modules/core/service")

class UserService  extends firebase {
	
	get core() {
		return new serviceCore()
	}
	
	create(email, password, name, photo) {
		
		return this._firebase.auth().createUser({
				email: email,
				emailVerified: false,
				password: password,
				displayName: name,
				photoURL: photo,
				disabled: false
			}).then((response)=>{
			return this.core.storeSet('users/',response.uid ,
				{
					'email': email,
					'name': name,
					'photo': photo,
					'uid': response.uid
				})
			})
			.catch((error)=> {
				return {
					status: false,
					data: error
				}
			})
	}

}
module.exports = UserService