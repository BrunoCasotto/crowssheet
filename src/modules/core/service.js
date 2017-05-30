let firebase = require("@modules/core/firebase")

class CoreService extends firebase{

	// This is a push method
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

	// This is a set method
	storeSet(path, id, data={}) {
	return this.database.ref(path).child(id)
		.set(data)
		.then(result => {
			return {
				status: true,
				data: result
			}
		}).catch(error => {
			return {
				status: false,
				data: error
			}
		})
	}

	//just delete data referenced by path
	delete(path="", id="" ) {
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

	//Update only the object params received
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

	//return a object that contains all objects into the path
	getAll(path) {
		return this.database.ref(path)
		.once('value')
		.then(( dataSnapshot ) => {
			return dataSnapshot.val()
		})
	}

	//return a object into the path
	getSingle( path, id ) {
		return this.database.ref(path+id)
		.once('value')
		.then((dataSnapshot)=> {
			return dataSnapshot.val()
		})
	}

	getRanking( path , child) {
		return new Promise(
		(resolve, reject)=> {
			this.database
			.ref(path)
			.orderByChild(child)
			.on("child_added",( snap ) => {
				console.log(snap.val())
				resolve( snap.val() )
			})
		})
	}
}
module.exports = CoreService 