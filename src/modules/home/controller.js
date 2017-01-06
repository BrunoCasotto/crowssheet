let homeService = require("@modules/home/service")
let postService = require("@modules/post/service")

class HomeController {

	index(request, reply) {
		let service = new postService()
		let posts = service.getPost()
		console.log(posts)
		reply.view('pages/home',{
			posts:[
				{
					title: 'My first post',
					text: 'Lorem ipsum dolor sit amet,',
					image: '/images/biblia.jpeg',
					autor: 'Bruno Casotto'
				},
				{
					title: 'My Second post',
					text: 'Lorem ipsum dolor sit amet,',
					image: '/images/biblia.jpeg',
					autor: 'Bruno Casotto'  
				},
				{
					title: 'My third post',
					text: 'Lorem ipsum dolor sit amet,',
					image: '/images/biblia.jpeg',
					autor: 'Bruno Casotto'  
				},
				{
					title: 'My fourth post',
					text: 'Lorem ipsum dolor sit amet,',
					image: '/images/biblia.jpeg',
					autor: 'Bruno Casotto'  
				}
			]
		})	
	}
}

module.exports = HomeController
