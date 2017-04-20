
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

}
module.exports = ClassRoomController