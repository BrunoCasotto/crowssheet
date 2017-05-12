let ClassRoomController = new require("@modules/user/classroom/controller")
let controller = new ClassRoomController

module.exports = [
	{ method: 'GET', path: '/classroom', handler: controller.index },
	{ method: 'GET', path: '/classroom/{courseId}', handler: controller.showCourseRoom },
	{ method: 'GET', path: '/classroom/{courseId}/{classId}', handler: controller.showClassRoom },
	{ method: 'GET', path: '/classroom/test/{courseId}/{classId}', handler: controller.showTestRoom },
	{ method: 'GET', path: '/classroom/teams/{userId}', handler: controller.getUserCourses },
	{ method: 'GET', path: '/classroom/courses/{teamId}', handler: controller.getTeamCourses }
]