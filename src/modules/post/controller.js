let PostService = require("@modules/post/service")
let Boom = require('boom')

class PostController {

	showSinglePost(request, reply) {
		let service = new PostService()
		reply.view('pages/singlePost',{postId: request.params.postId})
	}

	* store(request, reply) {
		let service = new PostService()
		let response = yield service.store(request.payload.post)
		if(response.status == true) {
			reply(true)
		} else {
			reply(response)
		}
	}

	* getAll(request, reply) {
		let service = new PostService()
		let result = yield service.getAll()
		let posts = []
		if(result.status == true) {
			result = result.data
			for(var key in result) {
				result[key]['key'] = key
				posts.push(result[key])
			}
		}
		reply(posts)
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
