import Axios from 'axios'

exports.saveSession = ( id )=>{
	return Axios({
		url: `/user/${id}`,
		method: 'get',
		data: {}
	}).then((result) => {

		let authKey = null
		for (var key in localStorage){
			authKey = key
		}

		let user = JSON.parse(localStorage[authKey])
		user.teacher = result.data.teacher
		localStorage.setItem('firebase', JSON.stringify(user))
		return {
			status: true
		}
	}).catch((error)=>{})
}

exports.removeSession = ()=>{
	localStorage.removeItem('firebase')
}
