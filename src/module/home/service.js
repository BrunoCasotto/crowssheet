let database = require("@module/core/firebase")

class HomeService {

	constructor() {
		this.firebase = new database()
	}

	test() {
		return 'aliases'
	}
}
module.exports = HomeService 