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

	* insertComment(request, reply) {
		let service 	= new ClassService()
		let comments 	= []

		if(request.payload.courseClass.comments) {
			comments = JSON.parse(request.payload.courseClass.comments)
		}

		comments.push(request.payload.comment)
		request.payload.courseClass.comments = JSON.stringify(comments)
		reply(yield service.update(
				null,
				request.payload.courseId,
				request.payload.courseClass,
				request.payload.id
			)
		)
	}

	* getAllcomments(request, reply) {
		let service 	= new ClassService()
		let comments 	= []
		let classData = yield service.getSingle(
			null,
			request.params.courseId,
			request.params.id
		)
		let final = true
		if(classData.comments) {
			comments = JSON.parse(classData.comments)
			comments.reverse()
			if(comments.length > parseInt(request.params.page) + 4) {
				final = false
			}
			comments = comments.slice(request.params.page - 1, parseInt(request.params.page) + 4)
		}

		reply({
			comments: comments,
			final: final
		})
	}
}
module.exports = ClassController
