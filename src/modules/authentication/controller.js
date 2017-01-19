let AuthService = require('@modules/authentication/service')

class AuthController {

	index(request, reply) {
		reply.view('pages/login')
	}

	showSingup(request, reply) {
        reply.view('pages/singup')
    }

	* singin(request, reply) {
		let service = new AuthService()
		return yield service.login(request.payload.email, request.payload.password)
	}

	* singup(request, reply) {
		let service = new AuthService()
		return yield service.singup( request.payload.email, request.payload.password)
	}
}
module.exports = AuthController
