
exports.updateStatusProgress = (final_score, questions_number, status)=>{
	status.progress = parseFloat(parseFloat(status.progress) + parseFloat(final_score)).toFixed(2)

	if(status.progress >= 100) {
		let initial = 0
		status.level++

		if(status.progress > 100) {
			let aditional 	=  status.progress - 100
			initial 		= aditional
		}
		status.progress = initial
	}

	return status
}

exports.updateStatusAchievement = (achievement, achievements)=>{
	for(let i=0; i < achievements.length; i++) {
		//if exists
		if(achievements[i].key == achievement.key) {
			achievements[i].quantity = parseInt(achievements[i].quantity) + 1
			return achievements
		}
	}

	//if not exist
	achievement.quantity = 1
	achievements.push(achievement)
	return achievements
}