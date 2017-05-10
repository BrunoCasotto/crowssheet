let firebase = require("@modules/core/firebase")
let serviceCore = require("@modules/core/service")

class CourseService extends firebase{

	get core() {
		return new serviceCore()
	}

	store( user, course) {
		return this.core.store('courses', course)
		.then((response)=>{
			if(response.status) {
				return this.core.storeSet('users/'+user+'/courses', response.data.o[1], {
					title: course.title,
					description: course.description
				})
			}
		})
		.catch((error)=>{
			return {
				status: false,
				data: error
			}
		})
	}

	delete( user, id ) {
		return this.core.delete( 'users/'+user+'/courses/', id )
		.then( response =>{
			if(response.status) {
				this.core.delete( 'courses/', id )
			}
		})
	}

	update( user, newCourse, id) {
		return this.core.update('courses/', newCourse, id)
		.then( response =>{
			if(response.status) {
				return this.core.update(
					'users/'+user+'/courses/', {
					title: newCourse.title,
					description: newCourse.description}, 
					id
				)
			}
		})
		.catch((error)=>{
			return {
				status: false,
				data: error
			}
		})
	}

	getAll( user ) {
		return this.core.getAll('users/'+user+'/courses/')
	}

	getSingle( user, id ) {
		return this.core.getSingle('courses/', id)
	}
}
module.exports = CourseService 