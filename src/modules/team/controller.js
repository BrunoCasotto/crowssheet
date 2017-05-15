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

			//setting users from team users Array
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

			//setting courses from team courses Array
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

	/** 
	 * Method to insert a user from team
	 * */
	* insertUser(request, reply) {
		let service 		= new TeamService()
		let userService 	= new UserService()
		let team 			= yield service.getSingle( request.payload.teamId )
		let owner			= yield userService.getSingle( request.payload.ownerId )
		team.users 			= JSON.parse( team.users )
		owner.teams[request.payload.teamId].users = JSON.parse( owner.teams[request.payload.teamId].users )

		if(team.users.includes( request.payload.userId )) {
			return {
				status: false,
				message: 'O usuário ja foi cadastrado'
			}
		} else {
			owner.teams[request.payload.teamId].users.push( request.payload.userId )
			team.users.push( request.payload.userId )
		}

		//update user
		let user = yield userService.getSingle(request.payload.userId)

		if( user.hasOwnProperty( "teams" ) ) {
			user.teams = JSON.parse(user.teams)
			user.teams.push(request.payload.teamId)
		} else {
			user['teams'] = [request.payload.teamId]
		}

		team.users									= JSON.stringify( team.users )
		owner.teams[request.payload.teamId].users	= JSON.stringify( owner.teams[request.payload.teamId].users )
		user.teams									= JSON.stringify(user.teams)

		//update database
		yield userService.update(request.payload.ownerId, owner)
		yield userService.update(request.payload.userId, user)

		return yield service.update( request.payload.teamId, team )
	}

	/** 
	 * Method to remove a user from team
	 * */
	* removeUser(request, reply) {
		let service 		= new TeamService()
		let userService 	= new UserService()
		let team 			= yield service.getSingle( request.payload.teamId )
		let user 			= yield userService.getSingle( request.payload.userId )
		let owner			= yield userService.getSingle( request.payload.ownerId )

		//parse string to array
		team.users 									= JSON.parse( team.users )
		user.teams 									= JSON.parse( user.teams )
		owner.teams[request.payload.teamId].users 	= JSON.parse( owner.teams[request.payload.teamId].users )

		//removing object from 
		if(team.users.includes(request.payload.userId)) {
			var index = team.users.indexOf( request.payload.userId )
			team.users.splice(index, 1)

			index = owner.teams[request.payload.teamId].users.indexOf(request.payload.courseId)
			owner.teams[request.payload.teamId].users.splice(index, 1)

			index = user.teams.indexOf( request.payload.teamId )
			user.teams.splice(index, 1)
		} else {
			return {
				status: false,
				message: 'O usuário não existe'
			}
		}

		//parse to string
		owner.teams[request.payload.teamId].users 	= JSON.stringify( owner.teams[request.payload.teamId].users )
		team.users 									= JSON.stringify(team.users)
		user.teams 									= JSON.stringify(user.teams)

		//save on database
		yield userService.update(request.payload.userId, user)
		yield userService.update(request.payload.ownerId, owner)
		return yield service.update( request.payload.teamId, team )
	}


	/** 
	 * Method to insert a course from team
	 * */
	* insertCourse(request, reply) {
		let service 		= new TeamService()
		let userService 	= new UserService()
		let team 			= yield service.getSingle( request.payload.teamId )
		let owner			= yield userService.getSingle( request.payload.ownerId )

		//parse string to array
		owner.teams[request.payload.teamId].courses = JSON.parse( owner.teams[request.payload.teamId].courses )
		team.courses 								= JSON.parse(team.courses)

		if(team.courses.includes(request.payload.courseId)) {
			return {
				status: false,
				message: 'O curso ja foi cadastrado'
			}
		} else {
			owner.teams[request.payload.teamId].courses.push( request.payload.courseId )
			team.courses.push( request.payload.courseId )
		}

		//parse array to string
		owner.teams[request.payload.teamId].courses = JSON.stringify( owner.teams[request.payload.teamId].courses )
		team.courses 								= JSON.stringify(team.courses)

		//update database
		yield userService.update(request.payload.ownerId, owner)
		return yield service.update( request.payload.teamId, team )
	}

	/** 
	 * Method to remove a course from team
	 * */
	* removeCourse(request, reply) {
		let service 		= new TeamService()
		let team 			= yield service.getSingle( request.payload.teamId )
		let userService 	= new UserService()
		let owner			= yield userService.getSingle( request.payload.ownerId )

		//parse string to array
		owner.teams[request.payload.teamId].courses = JSON.parse( owner.teams[request.payload.teamId].courses )
		team.courses 		= JSON.parse(team.courses)

		//remove from object
		if(team.courses.includes(request.payload.courseId)) {
			var index = team.courses.indexOf(request.payload.courseId)
			team.courses.splice(index, 1)

			index = owner.teams[request.payload.teamId].courses.indexOf(request.payload.courseId)
			owner.teams[request.payload.teamId].courses.splice(index, 1)
		} else {
			return {
				status: false,
				message: 'O curso não existe'
			}
		}

		//parse string to array
		team.courses 								= JSON.stringify(team.courses)
		owner.teams[request.payload.teamId].courses = JSON.stringify( owner.teams[request.payload.teamId].courses )

		yield userService.update(request.payload.ownerId, owner)
		return yield service.update( request.payload.teamId, team )
	}

	* update(request, reply) {
		let service = new TeamService()
		return yield service.update(  request.payload.teamId, request.payload.team, request.payload.userId )
	}
}
module.exports = TeamController