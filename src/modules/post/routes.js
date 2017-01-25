module.exports = ( controller ) => {
	PostController = require("@modules/post/controller")
	controller = controller || new PostController

	return [
		{method: 'POST', path: '/post/save', handler: controller.store},
		{method: 'GET',	path: '/post/{postId}', handler: controller.showSinglePost},
		{method: 'GET',	path: '/json/post/get', handler: controller.getPost},
		{method: 'GET', path: '/json/post/all', handler: controller.getAll},
		{method: 'GET',	path: '/json/post/get/category', handler: controller.getCategory},
		{method: 'GET', path: '/json/post/all/category', handler: controller.getAllCategories}
	]
}
