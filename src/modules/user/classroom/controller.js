
class ClassRoomController {

	index (request, reply) {
		reply.view('pages/classRoom')
	}

	showCourseRoom (request, reply) {
		reply.view('pages/courseRoom')
	}

	showClassRoom (request, reply) {
		reply.view('pages/courseClassRoom')
	}

	showTestRoom (request, reply) {
		reply.view('pages/testRoom')
	}

}
module.exports = ClassRoomController