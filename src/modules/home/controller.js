let homeService = require("@modules/home/service")
let postService = require("@modules/post/service")

class HomeController {
	
	index(request, reply) {
		let service = new postService()
		let posts = service.get()
		console.log(posts)
		reply.view('pages/home')
	}
}
module.exports = HomeController
