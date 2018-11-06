import Axios from 'axios'
import Firebase from 'firebase'

const ErrorMessage = {
	status: false,
	message: 'Dados incorretos'
}

class AuthService {

	constructor() {
		this._firebase = {}
		Axios({
			url: '/token',
			method: 'post',
			data: {}
		}).then((result)=>{
			this._firebase = Firebase.initializeApp(result.data)
		}).catch((error)=>{})
	}

	async login(email, password) {
		const authObj = await this._firebase.auth().signInWithEmailAndPassword(email, password)
		if(authObj) {
			const uid = authObj.uid || ''
			let user = await this.getUser({uid})

			if(user) {
				window.location.assign( `/dashboard` )
			} else {
				window.location.assign( `/register` )
			}
		} else {
			return ErrorMessage
		}
	}

	async getUser({uid}) {
		const userObject = await Axios({ url: '/login', method: 'post', data: { uid } })
		if(userObject.data) return userObject.data
		return ErrorMessage
	}

	singout() {
		return this._firebase.auth()
		.signOut()
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

	singup(user) {
		return Axios({
			url: '/user/create',
			method: 'post',
			data: user
		})
	}
}
export default new AuthService()
