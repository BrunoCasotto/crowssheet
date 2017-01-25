let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		return this.database.ref('posts').push(post)
		.then((result)=>{
			return {
				status: true,
				data: result.path
			}
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

	getCategory(categoryId, callback) {
		let ref = this.database.ref('categories/'+postId)
		return ref.on('value', (result)=>{
			callback(result.val())
		})
	}

	getAllCategories(callback) {
		let ref = this.database.ref('categories/')
		return ref.on('value', (result)=>{
			callback(result.val())
		})
	}

	storeCategory(post) {
		return this.database.ref('categories').push(post)
		.then((result)=>{
			return {
				status: true,
				data: result.path
			}
		})
	}
}
module.exports = PostService 