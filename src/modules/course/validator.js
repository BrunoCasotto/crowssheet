var Joi = require('joi')

class CourseValidator {

	get course() {
		return  {
			payload: {
				course: {
					title: Joi.string().min(5).required(),
					description: Joi.string().min(10).required(),
					image: Joi.string().min(5).required()
				}
			}
		}
	}
}

module.exports = new CourseValidator()
