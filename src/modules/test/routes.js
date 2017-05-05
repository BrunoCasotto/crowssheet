let TestController = require("@modules/test/controller")
let controller = new TestController()

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
	}
]