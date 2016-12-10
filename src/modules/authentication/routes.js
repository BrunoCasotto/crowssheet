module.exports = ( controller ) => {
	AuthController = require("@modules/authentication/controller")
	controller = controller || new AuthController()

	return [
		{method: 'GET',	path: '/auth/admin', handler: controller.index},
		{method: 'GET',	path: '/auth/register', handler: controller.register},

		{method: 'POST',	path: '/auth/login', handler: controller.login},
		{method: 'POST',	path: '/auth/singup', handler: controller.singup }
	]
}
