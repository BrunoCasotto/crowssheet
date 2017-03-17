
AuthController = require("@modules/authentication/controller")
controller = new AuthController()

module.exports = [
	{method: 'GET',	path: '/', handler: controller.index},
	{method: 'GET',	path: '/auth/register', handler: controller.showSingup},
	{method: 'GET',	path: '/auth/islogged', handler: controller.isLogged},
	{method: 'POST', path: '/auth/singin', handler: controller.singin},
	{method: 'POST', path: '/auth/singout', handler: controller.singout},
	{method: 'POST', path: '/auth/singup', handler: controller.singup},
	{method: 'POST', path: '/token', handler: controller.getToken}
]
