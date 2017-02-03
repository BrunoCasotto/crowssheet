let homeService = require("@modules/home/service")
let postService = require("@modules/post/service")
let jsonQuery = require('json-query')

class HomeController {

	index(request, reply) {
		let service = new postService()
		reply.view('pages/home')	
	}
}

module.exports = HomeController
