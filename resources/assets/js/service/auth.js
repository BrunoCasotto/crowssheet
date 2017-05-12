import Axios from 'axios'
import Firebase from 'firebase'
import SessionHelper from '_helpers/session'

class AuthService {

	constructor() {
		this._firebase = {}
		Axios({
			url: '/token',
			method: 'post',
			data: {}
		}).then((result)=>{ this._firebase = Firebase.initializeApp(result.data) }).catch((error)=>{})
	}

	login(email, password) {
		return this._firebase.auth()
		.signInWithEmailAndPassword(email, password)
		.then(response =>{ 
			if(response.uid) {
				return SessionHelper.saveSession( response.uid )
			} else {
				return {
					status: false,
					message: 'Dados incorretos'
				}
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
		return this._firebase.auth()
		.signOut()
		.then((response)=> {
			SessionHelper.removeSession()
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
