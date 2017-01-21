let AuthService = require('@modules/authentication/service')

class AuthController {

	index(request, reply) {
		let service = new AuthService()
		service.isSigned().then((result)=>{
			if(result)
				reply.redirect('/dashboard')
			else	
				reply.view('pages/login',{noheader: true})
		})
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
		return yield service.singup( request.payload.email, request.payload.password)
	}

	* isLogged(request, reply) {
		let service = new AuthService()
		console.log(yield service.isSigned())
		return yield service.isSigned()
	}
}
module.exports = AuthController
