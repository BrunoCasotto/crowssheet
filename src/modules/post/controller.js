let PostService = require("@modules/post/service")

class PostController {

	index(request, reply) {
		reply('post')
	}

	store(request, reply) {
		let service = new PostService()
		service.store()
	}
}
module.exports = PostController
