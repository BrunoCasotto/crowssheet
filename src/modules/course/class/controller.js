let ClassService = require("@modules/course/class/service")
let Boom = require('boom')

class ClassController {  

	* showClassUpdate(request, reply) {
		let service = new ClassService()
		let classData = yield service.getSingle( request.query.userId, request.query.courseId,request.query.id )
		if(classData) {
			classData.key = request.query.id
			request['session']  = {
				classData: {
					data: classData,
					courseId: request.query.courseId
				}
			}
		}

		reply.view('pages/classUpdate', {})  
	}

	* store(request, reply) {
		let service = new ClassService()
		let response = yield service.store( 
			request.payload.userId,
			request.payload.courseId,
			request.payload.courseClass
		)
		reply(response)
	}

	* delete(request, reply) {
		let service = new ClassService()
		let response = yield service.delete( 
			request.payload.userId,
			request.payload.courseId,
			request.payload.id
		)
		reply(response)
	}

	* update(request, reply) {
		let service = new ClassService()
		let response = yield service.update( 
			request.payload.userId, 
			request.payload.courseId, 
			request.payload.courseClass, 
			request.payload.id 
		)
		reply(response)
	}

	* getAll(request, reply) {
		let service = new ClassService()
		let response =  yield service.getAll( 
			request.query.userId,
			request.query.courseId
		)

		let classes = []
		for(var key in response) {
			response[key]['key'] = key
			classes.push(response[key])
		}

		return classes
	}

	* getSingle(request, reply) {
		let service = new ClassService()
		return yield service.getSingle( 
			request.query.userId,
			request.query.courseId,
			request.query.id
		)
	}
}
module.exports = ClassController
