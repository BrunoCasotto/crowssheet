let database = require("@modules/core/firebase")

class HomeService {

	constructor() {
		this.firebase = database
	}

	test() {
		return 'aliases'
	}
}
module.exports = HomeService 