let UserService = require("@modules/user/service")

class UserController {

	showUsers(request, reply) {
		reply.view('pages/userList')
	}

	* getAll(request, reply) {
		let service = new UserService()
		let response =  yield service.getAll( request.query.userId )
		let users = []
		for(var key in response) {
			response[key]['key'] = key
			users.push(response[key])
		}

		return users
	}
	
	* create(request, reply) {
		let service = new UserService()
		return yield service.create(
			request.payload.email,
			request.payload.password, 
			request.payload.name, 
			request.payload.photo,
			request.payload.teacher
		)
	}

	* getSingle(request, reply) {
		let service = new UserService()
		let user = yield service.getSingle(request.params.id)

		if(user.courses) {
			delete user.courses
		}

		if(user.teams) {
			delete user.teams
		}

		return user
	}

	* getSingleComplete(request, reply) {
		let service = new UserService()
		let user = yield service.getSingle(request.params.id)

		if(user.courses) {
			let courses = []
			for(var key in user.courses) {
				user.courses[key]['key'] = key
				courses.push(user.courses[key])
			}
			user.courses = courses
		}

		if(user.teams) {
			let teams = []
			for(var key in user.teams) {
				user.teams[key]['key'] = key
				teams.push(user.teams[key])
			}
			user.teams = teams
		}

		if(user.status) {
			if(user.status.completedTests) {
				user.status.completedTests = JSON.parse(user.status.completedTests)
			}
			if(user.status.progress) {
				user.status.progress = parseFloat(user.status.progress).toFixed(2)
			}
		}

		return user
	}

}
module.exports = UserController