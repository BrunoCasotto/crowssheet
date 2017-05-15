
exports.removeDuplicated = (data)=>{
	let uniqueArray = []
	data.forEach(item =>{
		if(!uniqueArray.includes(item)) {
			uniqueArray.push(item)
		}
	})

	return uniqueArray
}

