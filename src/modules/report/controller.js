let TeamService = require("@modules/team/service")
let UserService = require("@modules/user/service")
let ReportService = require("@modules/report/service")
let Helpers = require("./helpers")

class ReportController {

	* getUserRanking ( request, reply ) {
		let user_service  = new UserService()
		let users 		 	= yield user_service.getAll()

		let user_list	 	= []
		for(var key in users) {
			if(!users[key].teacher) {
				user_list.push({
					name: users[key].name,
					uid: users[key].uid,
					score: users[key].status.average,
					level: users[key].status.level,
					progress: users[key].status.progress
				})
			}
		}

		if(request.params.type == 'progress') {
			user_list = Helpers.sortUserByProgress(user_list)
		}

		reply(user_list)
	}

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