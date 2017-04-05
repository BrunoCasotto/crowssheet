let TeamService = require("@modules/team/service")

class TeamController {

	showteams(request, reply) {
		reply.view('pages/teamList')  
	}

	* getAll(request, reply) {

	}
	
	* create(request, reply) {
		let service = new TeamService()
		return yield service.create( request.payload.userId, request.payload.team )
	}

	* delete(request, reply) {
		console.log(request.payload)
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