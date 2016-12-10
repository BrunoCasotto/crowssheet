let homeService = require("@modules/home/service")

class HomeController {

	index(request, reply) {
		// let service = new homeService()
		reply.view('pages/login')
	}

    singup(request, reply) {
        console.log('passou')
        reply.view('pages/singup')
    }
}
module.exports = HomeController
