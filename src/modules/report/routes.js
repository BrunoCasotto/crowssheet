let ReportController = require("@modules/report/controller")
let controller = new ReportController()

module.exports = [
	{ method: 'GET', path: '/report/students/{userId}', handler: controller.getStudents },
	{ method: 'GET', path: '/report/user/{userId}', handler: controller.showUserStats },
	{ method: 'GET', path: '/report/user-ranking/{type}', handler: controller.getUserRanking }
]