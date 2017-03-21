var Joi = require('joi')

class CourseValidator {

	get store() {
		return  {
			payload: {
				course: {
					title: Joi.string().min(5).required(),
					description: Joi.string().min(10).required(),
					image: Joi.string().min(5).required()
				},
				userId: Joi.string().min(5).required()
			}
		}
	}

	get delete() {
		return  {
			payload: {
				id: Joi.string().min(5).required(),
				userId: Joi.string().min(5).required()
			}
		}
	}

	get update() {
		return  {
			payload: {
				id: Joi.string().min(5).required(),
				userId: Joi.string().min(5).required(),
				course: Joi.required()
			}
		}
	}

	get getAll() {
		return  {
			query: {
				userId: Joi.string().min(5).required()
			}
		}
	}

	get getSingle() {
		return  {
			query: {
				userId: Joi.string().min(5).required(),
				id: Joi.string().min(5).required()
			}
		}
	}
}

module.exports = new CourseValidator()
