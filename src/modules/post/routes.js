module.exports = ( controller ) => {
	PostController = require("@modules/post/controller")
	controller = controller || new PostController

	return [
		// {method: 'GET',	path: '/post/get-all', handler: controller.getPost},
		{method: 'GET',	path: '/post/save', handler: controller.store},
		{method: 'GET',	path: '/post/{postId}', handler: controller.showSinglePost}
	]
}
