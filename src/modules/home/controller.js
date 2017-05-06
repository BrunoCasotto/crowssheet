let homeService = require("@modules/home/service")

class HomeController {

	index(request, reply) {
		let service = new postService()
		reply.view('pages/home')	
	}
}

module.exports = HomeController
