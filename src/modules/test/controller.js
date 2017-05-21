let TestService 	= require("@modules/test/service")
let ClassService 	= require("@modules/course/class/service")
let UserService 	= require("@modules/user/service")
let Achievement 	= require("@modules/achievement/service")
let Helpers 		= require("./helpers")

class TestController {
	
	* store( request, reply ) {
		let service = new TestService()
		request.payload.test.questions = JSON.stringify(request.payload.test.questions)

		return yield service.store(
			request.payload.userKey
			,request.payload.courseKey
			,request.payload.classKey
			,request.payload.test
		)
	}

	* delete(request, reply) {
		let service 	= new TestService()
		let response 	= yield service.delete(
			request.payload.userKey
			,request.payload.courseKey
			,request.payload.classKey
		)
		reply(response)
	}

	//Receive the answers and update user/test history and status
	* answerTest(request, reply) {
		let score 				= 0
		let class_service 		= new ClassService()
		let classData 			= yield class_service.getSingle(null, request.payload.courseId, request.payload.classId)
		classData.test.history 	= JSON.parse(classData.test.history)
		//count score
		let test		= classData.test
		test.questions	= JSON.parse(test.questions)
		let answer		= []

		request.payload.answer.answers.forEach(result=>{
			answer.push( result.split('-')[1] )
		})

		for(let i=0; i<test.questions.length; i++) {
			if(test.questions[i].correct == answer[i]) {
				score++
			}
		}

		//getting user
		let user_service = new UserService()
		let user = yield user_service.getSingle(request.payload.userId)

		let questionsNumber		= test.questions.length
		let finalScore			= parseFloat(10/questionsNumber * score).toFixed(2)

		//getting a achievement
		if ( finalScore >= 5 ) {
			let achievement_service  = new Achievement()
			let achievement 		 = yield achievement_service.getRandon( finalScore )
			user.status.achievements = user.status.achievements ? JSON.parse(user.status.achievements) : []

			//if exists a return
			if(achievement) {
				user.status.achievements = Helpers.updateStatusAchievement(achievement, user.status.achievements)
			}
		}

		//create object to test history
		let historyItem = {
			userId		: request.payload.userId,
			userName	: user.name,
			date		: request.payload.answer.date,
			score		: finalScore
		}

		//update object to user stats
		user.status = Helpers.updateStatusProgress( 
			finalScore,
			classData.test.questions.length,
			user.status
		)
		user.status.completedTests 	= JSON.parse(user.status.completedTests)

		let historyUserItem 		= historyItem
		historyUserItem.courseId 	= request.payload.courseId
		historyUserItem.classId 	= request.payload.classId

		//update objects
		classData.test.history.push(historyItem)
		user.status.completedTests .push(historyUserItem)

		// prepare object to save
		classData.test.questions 	= JSON.stringify(classData.test.questions)
		classData.test.history 		= JSON.stringify(classData.test.history)
		user.status.achievements	= JSON.stringify(user.status.achievements)
		user.status.completedTests 	= JSON.stringify(user.status.completedTests)

		//save in the database
		user_service.update( request.payload.userId, user )
		class_service.update( null, request.payload.courseId, classData, request.payload.classId )
		
		return {
			status: true,
			message: `sua nota foi ${ finalScore }`
		}
	}
}

module.exports = TestController