let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		this.database.ref('posts').push({
			"title": post.title,
			"text": post.text
		})
	}

	getPost() {
		let ref = this.database.ref('posts/codigo1')
		ref.on('value', (snapshot) => {
			console.log(snapshot.val())
			return snapshot.val()
		})
	}
}
module.exports = PostService 