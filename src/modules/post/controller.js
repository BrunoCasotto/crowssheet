let homeService = require("@modules/post/service")

class PostController {

	index(request, reply) {
		reply('post')
	}
}
module.exports = PostController
