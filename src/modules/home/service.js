let database = require("@modules/core/firebase")

class HomeService {

	constructor() {
		this.firebase = database
	}

	test() {
		console.log(this.firebase)
		return 'aliases'
	}
}
module.exports = HomeService 