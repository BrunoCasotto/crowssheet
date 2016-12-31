let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		this.database.ref('post').push({
			"title": post.title,
			"text": post.text
		})
	}

	get() {
		let call = this.database.ref('users/email');
		call.on('value', function(users) {
		})
	}
}
module.exports = PostService 