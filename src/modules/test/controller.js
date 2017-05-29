let TestService 	= require("@modules/test/service")
let ClassService 	= require("@modules/course/class/service")
let CourseService 	= require("@modules/course/service")
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
		let couse_service 		= new CourseService()
		let courseData			= yield couse_service.getSingle( null, request.payload.courseId )
		let classData 			= yield class_service.getSingle(null, request.payload.courseId, request.payload.classId)
		classData.test.history 	= classData.test.history? JSON.parse(classData.test.history) : []

		//count score
		let test		= classData.test
		if(typeof test.questions == 'string') {
			test.questions	=  JSON.parse(test.questions)
		}
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

		//applying the achievement
		let achievement_service  = new Achievement()
		let achievement			 = null
		user.status.achievements = user.status.achievements ? JSON.parse(user.status.achievements) : []

		if(request.payload.item && request.payload.item.length > 0) {
			//getting a achievement object
			achievement = yield achievement_service.getSingle(request.payload.item)

			if(achievement.type == 'score') {
				finalScore = Helpers.updateScoreAchievement(achievement, finalScore)
			}

			user.status.achievements = Helpers.removeStatusAchievement(request.payload.item, user.status.achievements)
		}

		let gift = null
		if(!test.blockItemGift) {
			//getting a achievement ( gift)
			if ( finalScore >= 5 ) {
				let achievement = yield achievement_service.getRandon( finalScore )

				//if exists a return
				if(achievement) {
					gift = achievement
					user.status.achievements = Helpers.updateStatusAchievement(achievement, user.status.achievements)
				}
			}
		}

		//create object to test history
		let historyItem = {
			userId		: request.payload.userId,
			userName	: user.name,
			date		: request.payload.answer.date,
			score		: finalScore,
			achievement : achievement? achievement : null
		}

		//update object to user stats
		user.status = Helpers.updateStatusProgress(
			finalScore,
			classData.test.questions.length,
			user.status
		)

		//update average
		user.status.completedTests 	= JSON.parse(user.status.completedTests)
		user.status = Helpers.updateAverage(user.status)

		let historyUserItem 		= historyItem
		historyUserItem.courseId 	= request.payload.courseId
		historyUserItem.classId 	= request.payload.classId
		historyUserItem.courseTitle	= courseData.title
		historyUserItem.classTitle	= classData.title

		//update objects
		classData.test.history.push(historyItem)
		user.status.completedTests.push(historyUserItem)

		// prepare object to save
		classData.test.questions 	= JSON.stringify(classData.test.questions)
		classData.test.history 		= JSON.stringify(classData.test.history)
		user.status.achievements	= JSON.stringify(user.status.achievements)
		user.status.completedTests 	= JSON.stringify(user.status.completedTests)

		//save in the database
		user_service.update( request.payload.userId, user )
		class_service.update( null, request.payload.courseId, classData, request.payload.classId )

		//if the user receive a gift
		if( gift ) {
			return {
				status: true,
				message: `Sua nota foi ${ finalScore }`,
				gift: "PARABÉNS voce ganho o item: " + gift.name
			}
		} else {
			return {
				status: true,
				message: `Sua nota foi ${ finalScore }`
			}
		}


	}
}

module.exports = TestController