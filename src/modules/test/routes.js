let TestController = require("@modules/test/controller")
let controller = new TestController()
let validator = require('./validator')

module.exports = [
	{
		method: 'POST',
		path: '/test/save',
		handler: controller.store,
		config: {
			validate: validator.saveTest
		}
	},
	{
		method: 'POST',
		path: '/test/update',
		handler: controller.store,
		config: {
			validate: validator.updateTest
		}
	},
	{
		method: 'POST',
		path: '/test/delete',
		handler: controller.delete,
		config: {
			validate: validator.deleteTest
		}
	},
	{
		method: 'POST',
		path: '/test/answer',
		handler: controller.answerTest
	}
]