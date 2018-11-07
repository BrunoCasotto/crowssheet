const AuthService = require('@modules/authentication/service')
const UserService = require("@modules/user/service")
const cookie_options = {
	ttl: 24 * 60 * 1000,
	encoding: 'none',
	isSecure: false,
	isHttpOnly: false,
	clearInvalid: true,
	strictHeader: true
}

class AuthController {

	index(request, reply) {
		if(request.state.user_uid) {
			reply().redirect('/dashboard')
		} else {
			reply.view('pages/login',{})
		}
	}

	* login(request, reply) {
		const service = new UserService()
		const { uid } = request.payload
		let user = yield service.getSingle(uid)

		if(user.courses) delete user.courses
		if(user.teams) delete user.teams

		reply.state('user_uid', uid, cookie_options);

		return reply.response(user)
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
