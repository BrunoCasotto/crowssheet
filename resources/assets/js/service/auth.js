import Axios from 'axios'
import Firebase from 'firebase'

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

	isSigned() {
		this.init( ()=>{
			return new Promise( (resolve, reject) => {
				resolve(this._firebase.auth().currentUser)
			})
		})
	}

	login(email, password) {
		return this._firebase.auth()
		.signInWithEmailAndPassword(email, password)
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
} export default new AuthService()
