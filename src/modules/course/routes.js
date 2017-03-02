module.exports = ( controller ) => {
	CourseController = require("@modules/course/controller")
	controller = controller || new CourseController

	return [
		{method: 'POST', path: '/course/save', handler: controller.store},
		{method: 'POST', path: '/course/delete', handler: controller.delete},
		{method: 'POST', path: '/course/update', handler: controller.update},
		{method: 'GET',	path: '/course/{id}', handler: controller.getSingle},
		{method: 'GET', path: '/json/course/all', handler: controller.getAll}
	]
}
