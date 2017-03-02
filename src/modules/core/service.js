let firebase = require("@modules/core/firebase")

class CoreService extends firebase{

	store(path, data) {
		return this.database.ref(path).push(data)
			.then(result => {
				return {
					status: true,
					data: result.path
				}
			}).catch(error => {
				return{
					status: false,
					data: error
				}
			})
	}

	delete(path, id ) {
		return this.database.ref(path+id).remove()
		.then(function(response) {
			return {
				status: true,
				data: response
			}
		})
		.catch(function(error) {
			return {
				status: false,
				data: error.message
			}
		})
	}

	update( path, newData, id) {
		return this.database.ref(path+id).update(newData)
		.then(function(response) {
			return {
				status: true,
				data: response
			}
		})
		.catch(function(error) {
			return {
				status: false,
				data: error.message
			}
		})
	}

	getAll(path) {
		return this.database.ref(path)
		.once('value')
		.then((dataSnapshot)=> {
			return dataSnapshot.val()
		})
	}

	getSingle( path, id ) {
		return this.database.ref(path+id)
		.once('value')
		.then((dataSnapshot)=> {
			return dataSnapshot.val()
		})
	}
}
module.exports = CoreService 