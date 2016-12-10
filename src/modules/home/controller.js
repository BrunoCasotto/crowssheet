let homeService = require("@modules/home/service")

class HomeController {

	index(request, reply) {
		reply.view('pages/home')
	}
}
module.exports = HomeController
