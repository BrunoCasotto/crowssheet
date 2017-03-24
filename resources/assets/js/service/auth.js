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

	singup(user) {
		console.log(user)
		return Axios({
            url: '/user/create',
            method: 'post',
            data: user
        })
	}
} export default new AuthService()
