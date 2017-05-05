var Joi = require('joi')

class CourseValidator {

	get saveTest() {
		return  {
			payload: {
				test: Joi.object().required(),
				userKey: Joi.string().min(5).required(),
				courseKey: Joi.string().min(5).required(),
				classKey: Joi.string().min(5).required()
			}
		}
	}

}

module.exports = new CourseValidator()
