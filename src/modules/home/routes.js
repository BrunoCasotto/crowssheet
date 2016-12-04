module.exports = ( controller ) => {
	HomeController = require("@modules/home/controller")
	controller = controller || new HomeController

	return [
		{method: 'GET',	path: '/', handler: controller.index	}
	]
}