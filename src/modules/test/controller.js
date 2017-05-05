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
}

module.exports = TestController