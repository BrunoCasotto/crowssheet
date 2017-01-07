let PostService = require("@modules/post/service")

class PostController {

	getPost(request, reply) {
		let service = new PostService()
		service.getPost((result)=>{
			
		})
	}

	store(request, reply) {
		let service = new PostService()
		service.store()
	}
}
module.exports = PostController
