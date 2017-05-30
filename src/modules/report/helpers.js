
exports.removeDuplicated = (data)=>{
	let uniqueArray = []
	data.forEach(item =>{
		if(!uniqueArray.includes(item)) {
			uniqueArray.push(item)
		}
	})

	return uniqueArray
}

exports.sortUserByProgress = ( users )=>{

	users.sort((a,b)=> {
		a.real_progress = parseFloat(a.level * 100) + parseFloat(a.progress)
		b.real_progress = parseFloat(b.level * 100) + parseFloat(b.progress)
		if (a.real_progress < b.real_progress)
			return -1;
		if (a.real_progress > b.real_progress)
			return 1;
		return 0;
	})

	return users.reverse()
}



