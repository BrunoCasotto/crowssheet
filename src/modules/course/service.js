let firebase = require("@modules/core/firebase")
let serviceCore = require("@modules/core/service")

class CourseService extends firebase{

	get core() {
		return new serviceCore()
	}

	store(course) {
		return this.core.store('courses', course)
	}

	delete( id ) {
		return this.core.delete('courses/', id)
	}

	update( newCourse, id) {
		return this.core.update('courses/', newCourse, id)
	}

	getAll() {
		return this.core.getAll('courses/')
	}

	getSingle( id ) {
		return this.core.getSingle('courses/', id)
	}
}
module.exports = CourseService 