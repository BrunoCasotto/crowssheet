
	ClassController = require("@modules/course/class/controller")
	controller = new ClassController
	validator = require("./validator")

	module.exports = [
		{
			method: 'POST', 
			path: '/class/save', 
			handler: controller.store,
			config: {
				validate: validator.store
			}
		},
		{
			method: 'POST', 
			path: '/class/delete', 
			handler: 
			controller.delete,
			config: {
				validate: validator.delete
			}
		},
		{
			method: 'POST', 
			path: '/class/update', 
			handler: controller.update,
			config: {
				validate: validator.update
			}
		},
		{
			method: 'GET', 
			path: '/class/update', 
			handler: controller.showClassUpdate
		},
		{
			method: 'GET',	
			path: '/class', 
			handler: controller.getSingle,
			config: {
				validate: validator.getSingle
			}
		},
		{
			method: 'GET', 
			path: '/class/all',
			handler: controller.getAll,
			config: {
				validate: validator.getAll
			}
		}
	]
