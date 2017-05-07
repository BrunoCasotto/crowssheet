let TestService = require("@modules/test/service")

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

	* delete(request, reply) {
		let service = new TestService()
		let response = yield service.delete(
			request.payload.userKey
			,request.payload.courseKey
			,request.payload.classKey
		)
		reply(response)
	}
}

module.exports = TestController