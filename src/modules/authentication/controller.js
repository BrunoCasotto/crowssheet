let AuthService = require('@modules/authentication/service')

class AuthController {

	index(request, reply) {
		reply.view('pages/login',{}).state('session', { user: null })
	}

	* showDashboard(request, reply) {
		let service = new AuthService()
		let token = yield service.verifyToken(request.query.token)
		reply.view('pages/dashboard').state('session', { user: token.data })
	}

	getToken(request, reply) {
		let service = new AuthService()
		reply( service.getToken())
	}

	showSingup(request, reply) {
		reply.view('pages/singup',{
			noheader: true
		})
	}

	* singup(request, reply) {
		let service = new AuthService()
		return yield service.singup( request.payload.email, request.payload.password, request.payload.name )
	}
}
module.exports = AuthController
