
	CourseController = require("@modules/course/controller")
	controller = new CourseController
	validator = require("./validator")

	module.exports = [
		{
			method: 'POST', 
			path: '/course/save', 
			handler: controller.store,
			config: {
				validate: validator.store
			}
		},
		{
			method: 'POST', 
			path: '/course/delete', 
			handler: 
			controller.delete,
			config: {
				validate: validator.delete
			}
		},
		{
			method: 'POST', 
			path: '/course/update', 
			handler: controller.update,
			config: {
				validate: validator.update
			}
		},
		{
			method: 'GET',	
			path: '/course', 
			handler: controller.getSingle,
			config: {
				validate: validator.getSingle
			}
		},
		{
			method: 'GET', 
			path: '/json/course/all', 
			handler: controller.getAll,
			config: {
				validate: validator.getAll
			}
		}
	]
