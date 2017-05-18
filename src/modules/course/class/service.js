let firebase = require("@modules/core/firebase")
let serviceCore = require("@modules/core/service")

class CourseService extends firebase{

	get core() {
		return new serviceCore()
	}

	store( user, courseId, courseClass) {
		return this.core.store('/courses/'+courseId+'/classes/', courseClass)
	}

	delete( courseId, id ) {
		return this.core.delete( '/courses/'+courseId+'/classes/', id )
	}

	update( user, courseId, newClass, id) {
		return this.core.update('/courses/'+courseId+'/classes/', newClass, id)
	}

	getAll( user, courseId ) {
		return this.core.getAll('/courses/'+courseId+'/classes/')
	}

	getSingle( user, courseId, id ) {
		return this.core.getSingle('/courses/'+courseId+'/classes/', id)
	}
}
module.exports = CourseService 