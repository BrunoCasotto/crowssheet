let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		console.log(this._firebase.auth().currentUser)
		this.database.ref('post').push({
			"title": post.title,
			"text": post.text
		})
	}

	get() {
		let call = this.database.ref('users/email');
		call.on('value', function(users) {
			console.log( users.val())
		})
	}
}
module.exports = PostService 