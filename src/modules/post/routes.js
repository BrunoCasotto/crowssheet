module.exports = ( controller ) => {
	PostController = require("@modules/post/controller")
	controller = controller || new PostController

	return [
		{method: 'POST', path: '/post/save', handler: controller.store},
		{method: 'GET',	path: '/post/{postId}', handler: controller.showSinglePost},
		{method: 'GET',	path: '/json/post/get', handler: controller.getPost},
		{method: 'GET', path: '/post/all', handler: controller.getAll}
	]
}
