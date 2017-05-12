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

}
module.exports = UserController