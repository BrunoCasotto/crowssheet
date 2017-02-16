let firebase = require("@modules/core/firebase")

class PostService extends firebase{

	store(post) {
		return this.database.ref('posts').push(post)
			.then(result => {
				return {
					status: true,
					data: result.path
				}
			}).catch(error => {
				return{
					status: false,
					data: error
				}
			})
	}

	getPost(postId,callback) {
		let ref = this.database.ref('posts/'+postId)
		return new Promise( (resolve, reject) => {
			ref.once('value', snapshot => {
				resolve(snapshot.val())
			}, function(error) {
				reject(error)
			})
		})
	}

	getAll() {
		let ref = this.database.ref('posts/')
		return new Promise( (resolve, reject) => {
			ref.once('value', snapshot => {
				resolve({status: true,data: snapshot.val()})
			}, function(error) {
				reject(error)
			})
		})
	}

	getAllCategories() {
		let ref = this.database.ref('categories/')
		return new Promise( (resolve, reject) => {
			ref.once('value', snapshot => {
				resolve({status: true, data: snapshot.val()})
			}, function(error) {
				reject({status: false, data: error})
			})
		})
	}

	storeCategory(post) {
		return this.database.ref('categories').push(post)
			.then(result => {
				return {
					status: true,
					data: result.path
				}
			})
			.catch(error => {
				return{
					status: false,
					data: error
				}
			})
	}
}
module.exports = PostService 