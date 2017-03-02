let CourseService = require("@modules/course/service")
let Boom = require('boom')

class CourseController {  

	* showSingleCourse(request, reply) {
		let service = new CourseService()
		let post = yield service.getPost(request.params.postId)
		reply.view('pages/singlePost',post) 
	}

	* store(request, reply) {
		let service = new CourseService()
		let response = yield service.store(request.payload.course)
		reply(response)
	}

	* delete(request, reply) {
		let service = new CourseService()
		let response = yield service.delete( request.payload.id )
		reply(response)
	}

	* getAll(request, reply) {
		let service = new CourseService()
		let result = yield service.getAll()
	}
}
module.exports = CourseController
