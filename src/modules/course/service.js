let firebase = require("@modules/core/firebase")

class CourseService extends firebase{

	store(post) {
		return this.database.ref('courses').push(post)
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
		let ref = this.database.ref('courses/'+postId)
		return new Promise( (resolve, reject) => {
			ref.once('value', snapshot => {
				resolve(snapshot.val())
			}, function(error) {
				reject(error)
			})
		})
	}

	getAll() {
		let ref = this.database.ref('courses/')
		return new Promise( (resolve, reject) => {
			ref.once('value', snapshot => {
				resolve({status: true,data: snapshot.val()})
			}, function(error) {
				reject(error)
			})
		})
	}
}
module.exports = CourseService 