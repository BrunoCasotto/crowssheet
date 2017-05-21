let firebase = require('@modules/core/firebase')
let serviceCore = require("@modules/core/service")

class UserService  extends firebase {
	
	get core() {
		return new serviceCore()
	}

	getAll() {
		return this.core.getAll('users')
	}

	getSingle( id ) {
		return this.core.getSingle('users/', id)
	}
	
	create(email, password, name, photo, teacher) {

		//default value to create a user
		let status = {
			level: 1,
			progress: 0,
			achievements: "[]",
			completedTests: "[]",
			avatar: {
				gender: 'male',
				picture: 'http://wpshowdown.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png',
			}
		}
		
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
					'uid': response.uid,
					'teacher': teacher,
					'status' : status
				})
			})
			.catch((error)=> {
				return {
					status: false,
					data: error
				}
			})
	}

	update(userId, user) {
		return this.core.update('users/', user, userId)
	}

}
module.exports = UserService