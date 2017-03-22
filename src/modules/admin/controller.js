let AuthService = require('@modules/authentication/service')
let Injector = require('@middleware/injector')
let Boom = require('boom')

class DashController {
	
	index ( request, reply ) {
		reply.view('pages/dashboard') 
	}
}

module.exports = DashController
