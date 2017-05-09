let TeamService = require("@modules/team/service")
let UserService = require("@modules/user/service")

class TeamController {

	* showteams(request, reply) {
		reply.view('pages/team',{})
	}

	* showUpdate(request, reply) {
		let service = new TeamService()
		let team = yield service.getSingle( request.query.id )
		let teamUsers = JSON.parse(team.users)

		//getting user list
		let userService = new UserService()
		let response =  yield userService.getAll( request.query.userId )
		let users = []
		if(response) {
			for(var key in response) {
				response[key]['key'] = key
				users.push(response[key])
			}

			//setting users on team users Array
			if(teamUsers.length > 0) {
				team.users = []
				teamUsers.forEach( userId =>{
					team.users.push(response[userId])
				})
			}
		}

		//colocando o time na sessão
		if(team) {
			team.key = request.query.id
			request['session']  = {
				team: team,
				users: users
			}
		}

		reply.view('pages/teamUpdate',{})
	}

	* getAll(request, reply) {
		let service = new TeamService()
		let response = yield service.getAll( request.query.user )
		let teams = []
		for(var key in response) {
			response[key]['key'] = key
			teams.push(response[key])
		}

		return teams
	}
	
	* create(request, reply) {
		let service = new TeamService()
		return yield service.create( request.payload.userId, request.payload.team )
	}

	* delete(request, reply) {
		let service = new TeamService()
		return yield service.delete( request.payload.userId, request.payload.teamId )
	}

	* insertUser(request, reply) {
		let service = new TeamService()
		let team = yield service.getSingle( request.payload.teamId )
		team.users = JSON.parse(team.users)

		if(team.users.includes(request.payload.userId)) {
			return {
				status: false,
				message: 'O usuário ja foi cadastrado'
			}
		} else {
			team.users.push( request.payload.userId )
		}

		team.users = JSON.stringify(team.users)
		return yield service.update( request.payload.teamId, team )
	}
	
	* getTeam(request, reply) {
		
	}


	* removeUser(request, reply) {

	}

	* insertCourse(request, reply) {

	}

	* removeCourse(request, reply) {

	}

	* update(request, reply) {

	}
}
module.exports = TeamController