let homeService = require("@modules/home/service")
let postService = require("@modules/post/service")
let jsonQuery = require('json-query')

class HomeController {

	index(request, reply) {
		let service = new postService()
		service.getAll((result)=>{
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
