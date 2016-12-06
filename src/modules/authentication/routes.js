module.exports = ( controller ) => {
	AuthController = require("@modules/authentication/controller")
	controller = controller || new AuthController()

	return [
		{method: 'POST',	path: '/login', handler: controller.login}
	]
}