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

	delete( id ) {
		return this.database.ref('courses/'+id).remove()
		.then(function(response) {
			return {
				status: true,
				data: response
			}
		})
		.catch(function(error) {
			return {
				status: false,
				data: error.message
			}
		})
	}

	update( newCourse, id) {
		return this.database.ref('courses/'+id).update(newCourse)
		.then(function(response) {
			return {
				status: true,
				data: response
			}
		})
		.catch(function(error) {
			return {
				status: false,
				data: error.message
			}
		})
	}

	getAll() {
		return this.database.ref('courses/')
		.once('value')
		.then((dataSnapshot)=> {
			return dataSnapshot.val()
		})
	}

	// getAll() {
	// 	let ref = this.database.ref('courses/')
	// 	return new Promise( (resolve, reject) => {
	// 		ref.once('value', snapshot => {
	// 			resolve({status: true,data: snapshot.val()})
	// 		}, function(error) {
	// 			reject(error)
	// 		})
	// 	})
	// }
}
module.exports = CourseService 