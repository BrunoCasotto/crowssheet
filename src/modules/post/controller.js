let PostService = require("@modules/post/service")

class PostController {

	showSinglePost(request, reply) {
		let service = new PostService()
		reply.view('pages/singlePost',{postId: request.params.postId})
	}

	store(request, reply) { 
		let service = new PostService()
		service.store(request.payload.post)
	}   

	getAll(request, reply) {
		let service = new PostService()
		service.getAll((result)=>{
			let posts = []
			for(var key in result) {
				result[key]['key'] = key
				posts.push(result[key])
			}
			reply(posts)
		})
	}

	getPost(request, reply) {
		let service = new PostService()
		service.getPost(request.query.postId,(result)=>{
			reply(result)
		})
	}
	
}
module.exports = PostController
