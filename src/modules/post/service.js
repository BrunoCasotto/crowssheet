let database = require("@modules/core/firebase")

class PostService {

	constructor() {
		this.firebase = database
	}

}
module.exports = PostService 