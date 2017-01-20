let DashService = require('@modules/authentication/service')

class DashController {
	index( request, reply ) {
		reply.view('pages/dashboard', {
			noheader: true
		})
	}
}
module.exports = DashController
