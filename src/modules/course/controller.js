let CourseService = require("@modules/course/service")
let Boom = require('boom')

class CourseController {  

	* showSingleCourse(request, reply) {
		let service = new CourseService()
		let post = yield service.getPost(request.params.postId)
		reply.view('pages/singlePost',post) 
	}

	* store(request, reply) {
		console.log(request)
		let service = new CourseService()
		let response = yield service.store(request.payload.course)
		if(response.status == true) {
			reply(true)
		} else {
			reply(response)
		}
	}

	* getAll(request, reply) {
		let service = new Course()
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
}
module.exports = CourseController
