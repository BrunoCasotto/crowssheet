let TeamService = require("@modules/team/service")
let UserService = require("@modules/user/service")

class ReportController {

	* getStudents ( request, reply ) {
		//getting user
		let user_service 	= new UserService()
		let user 			= yield user_service.getSingle( request.params.userId )

		//getting teams
		let users			= []
		let team_service 	= new TeamService()
		for( var key in user.teams ) {
			let team		= yield team_service.getSingle( key )
			let user_list	= JSON.parse(team.users)
			users			= users.concat(user_list)
		}
		//remove duplicated users
		users = Helpers.removeDuplicated( users )

		reply([users])
	}

	* showUserStats( request, reply ) {

		let service = new UserService()
		let user = yield service.getSingle( request.params.userId )

		if(user) {
			request['session']  = {
				completeUser: user
			}
		}
		reply.view('pages/statistic/userStats',{ user: user })
	}
}

module.exports = ReportController