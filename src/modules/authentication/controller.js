let AuthService = require('@modules/authentication/service')

class AuthController {

	login(request, reply) {
		let service = new AuthService()
		
		reply(service.login(request.payload.email, request.payload.password))
	}    
}
module.exports = AuthController    