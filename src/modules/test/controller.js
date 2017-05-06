let TestService = require("@modules/test/service")
validator = require("./validator")

class TestController {
	
	* store( request, reply ) {
		let service = new TestService()
		request.payload.test.questions = JSON.stringify(request.payload.test.questions)

		return yield service.store(
			request.payload.userKey
			,request.payload.courseKey
			,request.payload.classKey
			,request.payload.test
		)
	}

	* update(request, reply) {
		let service = new CourseService()
		request.payload.test.questions = JSON.stringify(request.payload.test.questions)

		let response = yield service.update(
			request.payload.userKey
			,request.payload.courseKey
			,request.payload.classKey
			,request.payload.test
		)
		reply(response)
	}

	* delete(request, reply) {
		let service = new CourseService()

		let response = yield service.delete(
			request.payload.userKey
			,request.payload.courseKey
			,request.payload.classKey
		)
		reply(response)
	}
}

module.exports = TestController