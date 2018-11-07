const UserService = require("@modules/user/service")

class DashboardController {

	* showDashboard(request, reply) {
		let service = new UserService()
		let user = yield service.getSingle( request.state.user_uid )

		if(user) {
			request['session']  = {
				completeUser: user
			}
			reply.view('pages/dashboard',{})
		} else {
			reply().redirect('/')
		}
	}
}
module.exports = DashboardController
