let TeamController = require("@modules/team/controller")
let controller = new TeamController()

module.exports = [
	{method: 'POST', path: '/team/create', handler: controller.create},
	{method: 'POST', path: '/team/delete', handler: controller.delete},
	{method: 'POST', path: '/team/insert-user', handler: controller.insertUser},
	{method: 'GET', path: '/teams', handler: controller.showteams},
	{method: 'GET', path: '/team/all', handler: controller.getAll},
	{method: 'GET', path: '/team/update', handler: controller.showUpdate},
]