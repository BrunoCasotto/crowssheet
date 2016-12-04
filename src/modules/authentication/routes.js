module.exports = ( controller ) => {
	AuthController = require("@modules/authentication/controller")
	controller = controller || new AuthController()

	return [
		{method: 'GET',	path: '/login', handler: controller.login}
	]
}