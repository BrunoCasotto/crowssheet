let UserService = require("@modules/user/service")

class UserController {
	
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