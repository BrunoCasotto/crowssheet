let ClassRoomController = new require("@modules/user/classroom/controller")
let controller = new ClassRoomController

module.exports = [
	// {method: 'POST', path: '/user/create', handler: controller.create},
	{method: 'GET', path: '/classroom', handler: controller.index},
	{method: 'GET', path: '/classroom/{courseId}', handler: controller.showCourseRoom },
	{method: 'GET', path: '/classroom/{courseId}/{classId}', handler: controller.showClassRoom }
]