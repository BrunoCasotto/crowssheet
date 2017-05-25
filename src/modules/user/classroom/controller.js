let TeamService = require("@modules/team/service")
let UserService = require("@modules/user/service")
let CourseService = require("@modules/course/service")
let ClassService = require("@modules/course/class/service")
let TestService = require("@modules/test/service")

class ClassRoomController {

	index (request, reply) {
		reply.view('pages/classRoom')
	}

	* showCourseRoom (request, reply) {
		let service = new CourseService()
		let course 	= yield service.getSingle( null, request.params.courseId )

		if(course) {
			course.key 			= request.params.courseId
			request['session']  = {
				course: course
			}
		}
		reply.view('pages/courseRoom',{})
	}

	* showClassRoom (request, reply) {
		let service 	= new ClassService()
		let classData 	= yield service.getSingle(null, request.params.courseId, request.params.classId)

		if(classData) {
			classData.key		= request.params.classId
			classData.courseId 	= request.params.courseId
			request['session']  = {
				classData: classData
			}
		}
		reply.view('pages/courseClassRoom',{})
	}

	* showTestRoom (request, reply) {
		let test_service 	= new TestService()
		let test 			= yield test_service.getSingle(request.params.courseId, request.params.classId)
		let user_service 	= new UserService()
		let user 			= yield user_service.getSingle(request.query.userId)
		let service 		= new ClassService()
		let classData 		= yield service.getSingle(null, request.params.courseId, request.params.classId)

		if(test && classData) {
			if(typeof(test.questions) == 'string') {
				test.questions = JSON.parse(test.questions)
			}

			classData.courseId 	= request.params.courseId
			classData.key 		= request.params.classId
			request['session']  = {
				test: test,
				classData: classData,
				completeUser: user
			}
		}

		reply.view('pages/testRoom',{})
	}

	* getUserCourses(request, reply) {
		let user_service 	= new UserService()
		let user 			= yield user_service.getSingle(request.params.userId)

		if( user.hasOwnProperty("teams") ) {
			user.teams = JSON.parse(user.teams)
		} else {
			reply([])
		}

		//getting team list
		let team_service 	= new TeamService()
		let teams 			= []

		for(let i=0; i<user.teams.length; i++) {
			let team = yield team_service.getSingle( user.teams[i] )
			team.key = user.teams[i]
			teams.push( team )
		}

		reply(teams)
	}

	* getTeamCourses(request, reply) {
		let team_service 	= new TeamService()
		let team 			= yield team_service.getSingle( request.params.teamId )

		if( team.hasOwnProperty("courses") ) {
			team.courses = JSON.parse(team.courses)
		} else {
			reply([])
		}

		//getting course list
		let course_service 	= new CourseService()
		let courses 		= []

		for(let i=0; i<team.courses.length; i++) {
			let course	= yield course_service.getSingle( null, team.courses[i] )

			if(course) {
				course.key	= team.courses[i]
				courses.push( course )
			}
		}

		return courses
	}

}
module.exports = ClassRoomController