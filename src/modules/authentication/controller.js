let AuthService = require('@modules/authentication/service')

class AuthController {

	index(request, reply) {
		let service = new AuthService()
		service.isSigned().then((result)=>{
			if(result) {
				request.session = { user: result}
				reply.redirect('/dashboard')
			 } else	{
				reply.view('pages/login',{noheader: true})
			 }
		})
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

	* singin(request, reply) {
		let service = new AuthService()
		return yield service.login(request.payload.email, request.payload.password)
	}

	* singup(request, reply) {
		let service = new AuthService()
		return yield service.singup( request.payload.email, request.payload.password, request.payload.name)
	}
	
	* singout(request, reply) {
		let service = new AuthService()
		let response = yield service.singout()
		if(response) {
			reply.view('pages/login',{noheader: true})
		} else {
			return response
		}
		
	}

	* isLogged(request, reply) {
		let service = new AuthService()
		return yield service.isSigned()
	}
}
module.exports = AuthController
