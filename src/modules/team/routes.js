let TeamController = require("@modules/team/controller")
let controller = new TeamController()

module.exports = [
	{method: 'POST', path: '/team/create', handler: controller.create},
	{method: 'POST', path: '/team/delete', handler: controller.delete},
	{method: 'GET', path: '/teams', handler: controller.showteams},
	{method: 'GET', path: '/team/all', handler: controller.getAll}
]