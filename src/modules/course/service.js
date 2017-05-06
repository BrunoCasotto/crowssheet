let firebase = require("@modules/core/firebase")
let serviceCore = require("@modules/core/service")

class CourseService extends firebase{

	get core() {
		return new serviceCore()
	}

	store( user, course) {
		return this.core.store('users/'+user+'/courses', course)
	}

	delete( user, id ) {
		return this.core.delete( 'users/'+user+'/courses/', id )
	}

	update( user, newCourse, id) {
		return this.core.update('users/'+user+'/courses/', newCourse, id)
	}

	getAll( user ) {
		return this.core.getAll('users/'+user+'/courses/')
	}

	getSingle( user, id ) {
		return this.core.getSingle('users/'+user+'/courses/', id)
	}
}
module.exports = CourseService 