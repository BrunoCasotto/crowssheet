module.exports = ( controller ) => {
	PostController = require("@modules/post/controller")
	controller = controller || new PostController

	return [
		{method: 'GET',	path: '/post/{post}', handler: controller.index},
		{method: 'GET',	path: '/post/save', handler: controller.store}
	]
}
