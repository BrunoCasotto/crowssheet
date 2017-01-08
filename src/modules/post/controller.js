let PostService = require("@modules/post/service")

class PostController {

	showSinglePost(request, reply) {
		let service = new PostService()
		let codigo = request.params.postId

		service.getPost(codigo, (result)=>{
			if(result) {
				reply.view('pages/singlePost',{
				post:{
						title: result.title ? result.title : '' ,
						text: result.text ? result.text : '' ,
						image: result.image ? result.image : '',
						autor: result.author ? result.autor : ''
					}
				})
			} else {
				reply('no post')
			}	
		})
	}

	store(request, reply) {
		let service = new PostService()
		service.store()
	}
}
module.exports = PostController
