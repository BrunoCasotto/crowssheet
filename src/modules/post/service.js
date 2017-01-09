let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		this.database.ref('posts').push({
			"title": post.title,
			"text": post.text
		})
	}

	getPost(postId,callback) {
		let ref = this.database.ref('posts/'+postId)
		return ref.on('value', (result)=>{
			callback(result.val())
		})
	}

	getAll(callback) {
		let ref = this.database.ref('posts/')
		
		return ref.on('value', (result)=>{
			callback(result.val())
		})
	}
}
module.exports = PostService 