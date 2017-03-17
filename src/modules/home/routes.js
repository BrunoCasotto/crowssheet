HomeController = require("@modules/home/controller")
controller = new HomeController
	
module.exports =  [
	{method: 'GET',	path: '/home', handler: controller.index}
]

