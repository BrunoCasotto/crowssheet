let TeamService = require("@modules/team/service")

class TeamController {

	* showteams(request, reply) {
		reply.view('pages/team',{})
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
	
	* getTeam(request, reply) {
		
	}

	* insertUser(request, reply) {

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