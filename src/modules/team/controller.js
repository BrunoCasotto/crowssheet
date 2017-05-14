let TeamService = require("@modules/team/service")
let UserService = require("@modules/user/service")
let CourseService = require("@modules/course/service")

class TeamController {

	* showteams(request, reply) {
		reply.view('pages/team',{})
	}

	* showUpdate(request, reply) {
		let service 	= new TeamService()
		let team 		= yield service.getSingle( request.query.id )
		let teamUsers 	= JSON.parse(team.users)
		let teamCourses = JSON.parse(team.courses)
		team.users 		= []
		team.courses 	= []

		//getting user list
		let userService = new UserService()
		let response 	=  yield userService.getAll( request.query.userId )
		let users 		= []

		if(response) {
			for(var key in response) {
				response[key]['key'] = key
				users.push(response[key])
			}

			//setting users on team users Array
			if(teamUsers.length > 0) {
				teamUsers.forEach( userId =>{
					team.users.push(response[userId])
				})
			}
		}

		//getting course list
		let courseService 	= new CourseService()
		let courseResponse 	=  yield courseService.getAll( request.query.userId )
		let courses 		= []

		if(courseResponse) {
			for(var key in courseResponse) {
				courseResponse[key]['key'] = key
				courses.push(courseResponse[key])
			}

			//setting courses on team courses Array
			if(teamCourses.length > 0) {
				teamCourses.forEach( courseId =>{
					if(courseResponse[courseId] != undefined) {
						team.courses.push(courseResponse[courseId])
					}
				})
			}
		}

		//colocando o time na sessão
		if(team) {
			team.key = request.query.id
			request['session'] = {
				team: team,
				users: users,
				courses: courses
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
		request.payload.team.users = JSON.stringify(request.payload.team.users)
		request.payload.team.courses = JSON.stringify(request.payload.team.courses)

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

		//update user
		let userService = new UserService()
		let user = yield userService.getSingle(request.payload.userId)

		if( user.hasOwnProperty("teams") ) {
			user.teams = JSON.parse(user.teams)
			user.teams.push(request.payload.teamId)
		} else {
			user['teams'] = [request.payload.teamId]
		}
		user.teams = JSON.stringify(user.teams)
		yield userService.update(request.payload.userId, user)

		return yield service.update( request.payload.teamId, team )
	}

	* removeUser(request, reply) {
		let service = new TeamService()
		let team = yield service.getSingle( request.payload.teamId )
		team.users = JSON.parse(team.users)

		if(team.users.includes(request.payload.userId)) {
			var index = team.users.indexOf(request.payload.userId)
			team.users.splice(index, 1)
		} else {
			return {
				status: false,
				message: 'O usuário não existe'
			}
		}
		team.users = JSON.stringify(team.users)

		//update user
		let userService = new UserService()
		let user = yield userService.getSingle(request.payload.userId)
		user.teams = JSON.parse(user.teams)

		var index = user.teams.indexOf( request.payload.teamId )
		user.teams.splice(index, 1)
		user.teams = JSON.stringify(user.teams)

		yield userService.update(request.payload.userId, user)

		return yield service.update( request.payload.teamId, team )
	}

	* insertCourse(request, reply) {
		let service = new TeamService()
		let team = yield service.getSingle( request.payload.teamId )
		team.courses = JSON.parse(team.courses)

		if(team.courses.includes(request.payload.courseId)) {
			return {
				status: false,
				message: 'O curso ja foi cadastrado'
			}
		} else {
			team.courses.push( request.payload.courseId )
		}

		team.courses = JSON.stringify(team.courses)
		return yield service.update( request.payload.teamId, team )
	}

	* removeCourse(request, reply) {
		let service = new TeamService()
		let team = yield service.getSingle( request.payload.teamId )
		team.courses = JSON.parse(team.courses)

		if(team.courses.includes(request.payload.courseId)) {
			var index = team.courses.indexOf(request.payload.courseId)
			team.courses.splice(index, 1)
		} else {
			return {
				status: false,
				message: 'O curso não existe'
			}
		}

		team.courses = JSON.stringify(team.courses)
		return yield service.update( request.payload.teamId, team )
	}

	* update(request, reply) {
		let service = new TeamService()
		return yield service.update(  request.payload.teamId, request.payload.team, request.payload.userId )
	}
}
module.exports = TeamController