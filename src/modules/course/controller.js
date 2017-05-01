let CourseService = require("@modules/course/service")
let Boom = require('boom')

class CourseController {

	* showCourseForm(request, reply) {
		reply.view('pages/courseForm')
	}

	* showCourseUpdate(request, reply) {
		let service = new CourseService()
		let course = yield service.getSingle( request.query.userId, request.query.id )
		if(course) {
			request['session']  = {
				course: course
			}
		}

		reply.view('pages/courseUpdate', {})  
	}

	* showAllCourse(request, reply) {
		reply.view('pages/courseList')  
	}

	* showSingleCourse(request, reply) {
		let service = new CourseService()
		let post = yield service.getPost( request.params.postId )
		reply.view('pages/singlePost',post) 
	}


	* store(request, reply) {
		let service = new CourseService()
		let response = yield service.store( request.payload.userId, request.payload.course )
		reply(response)
	}

	* delete(request, reply) {
		let service = new CourseService()
		let response = yield service.delete( request.payload.userId, request.payload.id )
		reply(response)
	}

	* update(request, reply) {
		let service = new CourseService()
		let response = yield service.update( request.payload.userId, request.payload.course, request.payload.id )
		reply(response)
	}

	* getAll(request, reply) {
		let service = new CourseService()
		let response =  yield service.getAll( request.query.userId )
		let courses = []
		for(var key in response) {
			response[key]['key'] = key
			courses.push(response[key])
		}

		return courses
	}

	* getSingle(request, reply) {
		let service = new CourseService()
		return yield service.getSingle( request.query.userId, request.query.id )
	}
}
module.exports = CourseController
