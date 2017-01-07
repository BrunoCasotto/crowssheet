let homeService = require("@modules/home/service")
let postService = require("@modules/post/service")

class HomeController {

	index(request, reply) {
		let service = new postService()
		service.getPost('codigo1',(result)=>{
			reply.view('pages/home',{
				posts:[
					{
						title: result.title,
						text: result.text,
						image: result.image,
						autor: result.author
					}
				]
			})	
		})
	}
}

module.exports = HomeController
