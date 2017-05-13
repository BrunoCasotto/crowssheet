var Joi = require('joi')

class ClassValidator {

	get store() {
		return  {
			// payload: {
			// 	courseClass: {
			// 		title: Joi.string().min(5).required(),
			// 		description: Joi.string().min(10).required(),
			// 		content: Joi.string().min(50).required(),
			// 		image: Joi.string().min(5),
			// 		file: Joi.string().min(5),
			// 		video: Joi.string().min(5)
			// 	},
			// 	userId: Joi.string().min(5).required(),
			// 	courseId: Joi.string().min(5).required()
			// }
		}
	}

	get delete() {
		return  {
			payload: {
				id: Joi.string().min(5).required(),
				userId: Joi.string().min(5).required(),
				courseId: Joi.string().min(5).required()
			}
		}
	}

	get update() {
		return  {
			payload: {
				id: Joi.string().min(5).required(),
				userId: Joi.string().min(5).required(),
				courseId: Joi.string().min(5).required(),
				courseClass: Joi.required()
			}
		}
	}

	get getAll() {
		return  {
			query: {
				userId: Joi.string().min(5).required(),
				courseId: Joi.string().min(5).required()
			}
		}
	}

	get getSingle() {
		return  {
			query: {
				userId: Joi.string().min(5).required(),
				courseId: Joi.string().min(5).required(),
				id: Joi.string().min(5).required()
			}
		}
	}
}

module.exports = new ClassValidator()
