let AuthService = require('@modules/authentication/service')
let Injector = require('@middleware/injector')
let Boom = require('boom')

class DashController {
	
	index ( request, reply ) {
		let service = new AuthService()
		service.isSigned().then( result => {
			if (result == null ){
				// reply.view('pages/login', { noheader: true })
				Injector.data = 'Novo valor'
				reply.view('pages/dashboard', { noheader: true })
			} else {
				reply.view('pages/dashboard', { noheader: true })
			}
		})
	}
}

module.exports = DashController
