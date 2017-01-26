module.exports = ( controller ) => {
	FileController = require("@modules/files/controller")
	controller = controller || new FileController

	return [
		{
			method: 'POST', 
			path: '/file/image/save',
			config: {
				 payload:{
					maxBytes:209715200,
					output:'stream',
					parse: false
				}, 
				handler: controller.storeImage
			}
		}
		// {method: 'GET',	path: '/post/{postId}', handler: controller.showSinglePost},
		// {method: 'GET',	path: '/json/post/get', handler: controller.getPost},
		// {method: 'GET', path: '/json/post/all', handler: controller.getAll},
		// {method: 'GET',	path: '/json/post/get/category', handler: controller.getCategory},
		// {method: 'GET', path: '/json/post/all/category', handler: controller.getAllCategories}
	]
}
