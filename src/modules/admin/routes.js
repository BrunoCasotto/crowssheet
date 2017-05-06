DashController = require("@modules/admin/controller")
controller = new DashController()

module.exports = [
	{ method: 'GET', path: '/dashboard',handler: controller.index }
]
