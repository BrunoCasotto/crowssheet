let AuthService = require('@modules/authentication/service')

class AuthController {

	index(request, reply) {
		reply.view('pages/login')
	}

	register(request, reply) {
		reply.view('pages/singup')
	}

	login(request, reply) {
		let service = new AuthService()
		if(service.login(request.payload.email, request.payload.password)) {
			reply.view('pages/dashboard')
		} else {
			//page login wrong
		}
	}

	singup(request, reply) {
		let service = new AuthService()
		if( request.payload.password == request.payload.passwordAgain ) {
			if(service.singup( request.payload.email, request.payload.password)) {
				reply.view('pages/dashboard')
			} else {
				//return error page
			}
		}
		return false
	}
}
module.exports = AuthController
