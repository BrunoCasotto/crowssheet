let serviceCore = require("@modules/core/service")
let firebase = require("@modules/core/firebase")

class AchievementService extends firebase{
	get core() {
		return new serviceCore()
	}

	getAll() {
		return this.core.getAll('achievements/')
	}

	* getRandon( score ) {
		let achievement = yield this.core.getAll('achievements/')
		let achievements = []
		for(var key in achievement) {
			achievement[key]['key'] = key
			achievements.push(achievement[key])
		}
		achievements = achievements.concat(achievements)
		// return a number 1 - 10
		let number = Math.floor((Math.random() * score) + 1)

		if(achievements[number] == 'undefined') 
			return null

		if( achievements[number].min_score < score )
			return achievements[number]
		else
			return null
	}

}
module.exports = AchievementService