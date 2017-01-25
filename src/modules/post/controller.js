let PostService = require("@modules/post/service")

class PostController {

	showSinglePost(request, reply) {
		let service = new PostService()
		reply.view('pages/singlePost',{postId: request.params.postId})
	}

	* store(request, reply) {
		let service = new PostService()
		let response = yield service.store(request.payload.post)
		reply(response)
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

	getAllCategories(request, reply) {
		let service = new PostService()
		service.getAllCategories((result)=>{
			let categories = []
			for(var key in result) {
				categories.push({
					key: key,
					name: result[key]
				})
			}
			reply(categories)
		})
	}

	getCategory(request, reply) {
		let service = new PostService()
		service.getCategory(request.query.postId,(result)=>{
			reply(result)
		})
	}

	* storeCategory(request, reply) {
		let service = new PostService()
		let response = yield service.storeCategory(request.payload.category)
		reply(response)
	}  
	
}
module.exports = PostController
