let AuthService = require('@modules/authentication/service')
let Injector = require('@middleware/injector')
let Boom = require('boom')

class DashController {
	
	index ( request, reply ) {
		let service = new AuthService()
		reply.view('pages/dashboard', { noheader: true })
	}
}

module.exports = DashController
