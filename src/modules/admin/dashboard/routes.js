module.exports = ( controller ) => {
	DashController = require("@modules/admin/dashboard/controller")
	controller = controller || new DashController()

	return [
		{
			method: 'GET',	
			path: '/dashboard',
			handler: controller.index
		}
	]
}
