let homeService = require("@module/home/service")

class HomeController {

	index(request, reply) {
		let service = new homeService()
		reply.view('pages/home')
	}   
}
module.exports = HomeController