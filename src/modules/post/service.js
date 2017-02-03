let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		return this.database.ref('posts').push(post)
		.then((result)=>{
			return {
				status: true,
				data: result.path
			}
		}).catch((error)=>{
			return{
				status: false,
				data: error
			}
		})
	}

	getPost(postId,callback) {
		let ref = this.database.ref('posts/'+postId)
		return ref.on('value', (result)=>{
			callback(result.val())
		})
	}

	getAll() {
		let ref = this.database.ref('posts/')
		return new Promise( (resolve, reject) => {
			ref.once('value', function(snapshot) {
				resolve({status: true,data: snapshot.val()})
			}, function(error) {
				reject(error)
			})
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
		}).catch((error)=>{
			return{
				status: false,
				data: error
			}
		})
	}
}
module.exports = PostService 