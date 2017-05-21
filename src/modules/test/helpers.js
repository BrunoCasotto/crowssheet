
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
