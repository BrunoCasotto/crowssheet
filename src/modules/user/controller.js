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
			request.payload.photo
		)
	}

}
module.exports = UserController