let homeService = require("@module/home/service")

class HomeController {

	index(request, reply) {
		let service = new homeService()
		reply.view('index')
	}
}
module.exports = HomeController