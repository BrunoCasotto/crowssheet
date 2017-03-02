module.exports = ( controller ) => {
	CourseController = require("@modules/course/controller")
	controller = controller || new CourseController

	return [
		{method: 'POST', path: '/course/save', handler: controller.store},
		{method: 'POST', path: '/course/delete', handler: controller.delete},
		{method: 'GET',	path: '/course/{courseId}', handler: controller.showSingleCourse},
		{method: 'GET', path: '/json/course/all', handler: controller.getAll}
	]
}
