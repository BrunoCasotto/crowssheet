DashController = require("@modules/admin/dashboard/controller")
controller = new DashController()

module.exports = [
	{ method: 'GET',	path: '/dashboard',handler: controller.index }
]
