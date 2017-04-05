let UserController = new require("@modules/user/controller")
let controller = new UserController

module.exports = [
	{method: 'POST', path: '/user/create', handler: controller.create},
	{method: 'GET', path: '/users', handler: controller.showUsers},
	{method: 'GET', path: '/user/all', handler: controller.getAll}
]