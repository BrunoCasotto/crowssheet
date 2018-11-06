let AuthService = require('@modules/authentication/service')
let UserService = require("@modules/user/service")

class AuthController {

	index(request, reply) {
		reply.view('pages/login',{})
	}

	* login(request, reply) {
		const service = new UserService()
		const { uid } = request.payload
		let user = yield service.getSingle(uid)

		if(user.courses) delete user.courses
		if(user.teams) delete user.teams

		return reply.response(user).state('data', uid )
	}

	* showDashboard(request, reply) {
		let service = new UserService()
		let user = yield service.getSingle( request.query.userId )
		if(user) {
			request['session']  = {
				completeUser: user
			}
		}
		reply.view('pages/dashboard',{})
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
