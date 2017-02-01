let DashService = require('@modules/authentication/service')
let AuthService = require('@modules/authentication/service')
let Boom = require('boom')

class DashController {
	
	index( request, reply ) {
		let service = new AuthService()
		service.isSigned().then((result)=>{
			console.log(result)
			if(result == null ){
				reply.view('pages/login',{noheader: true})
			} else {
				reply.view('pages/dashboard', {
					noheader: true
				})
			}
		})
	}
}
module.exports = DashController
