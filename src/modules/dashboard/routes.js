
DashController = require("@modules/dashboard/controller")
controller = new DashController()

module.exports = [
	{ method: 'GET',	path: '/dashboard', handler: controller.showDashboard }
]
