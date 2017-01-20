module.exports = ( controller ) => {
	PostController = require("@modules/post/controller")
	controller = controller || new PostController

	return [
		{method: 'GET',	path: '/post/{postId}', handler: controller.showSinglePost},
		{method: 'POST', path: '/post/save', handler: controller.store}
	]
}
