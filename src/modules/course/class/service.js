let firebase = require("@modules/core/firebase")
let serviceCore = require("@modules/core/service")

class CourseService extends firebase{

	get core() {
		return new serviceCore()
	}

	store( user, courseId, courseClass) {
		return this.core.store('users/'+user+'/courses/'+courseId+'/classes/', courseClass)
	}

	delete( user, courseId, id ) {
		return this.core.delete( 'users/'+user+'/courses/'+courseId+'/classes/', id )
	}

	update( user, courseId, newClass, id) {
		return this.core.update('users/'+user+'/courses/'+courseId+'/classes/', newClass, id)
	}

	getAll( user, courseId ) {
		return this.core.getAll('users/'+user+'/courses/'+courseId+'/classes/')
	}

	getSingle( user, courseId, id ) {
		return this.core.getSingle('users/'+user+'/courses/'+courseId+'/classes/', id)
	}
}
module.exports = CourseService 