module.exports = ( controller ) => {
	DashController = require("@modules/admin/dashboard/controller")
	controller = controller || new DashController()

	return [
		{method: 'GET',	path: '/dashboard', handler: controller.index}
		// {method: 'GET',	path: '/auth/register', handler: controller.showSingup},

		// {method: 'POST', path: '/auth/singin', handler: controller.singin},
		// {method: 'POST', path: '/auth/singup', handler: controller.singup}
	]
}
