let serviceCore = require("@modules/core/service")

class  TeamService{

	get core() {
		return new serviceCore()
	}
	
	create( user, team ) {
		return this.core.store('teams', team)
		.then((response)=>{
			return this.core.storeSet('users/'+user+'/teams', response,null)
		})
		.catch((error)=>{
			return {
				status: false,
				data: error
			}
		})
	}

	delete( user, teamId ) {
		return this.core.delete( 'teams/' + teamId)
		.then((response)=>{
			return this.core.delete( 'users/'+user+'/teams',teamId)
		})
		.catch((error)=>{
			return {
				status: false,
				data: error
			}
		})
	}
	
	getSingle( teamId ) {
		return this.core.getSingle('teams/', teamId)
	}

	insertUser( userId ) {
		return this.core.storeSet('teams/users',users,{})
	}

	removeUser( userId ) {
		return this.core.delete( 'teams/users/', userId )
	}

	insertCourse( courseId ) {
		return this.core.storeSet('teams/courses',courseId,{})
	}

	removeCourse( courseId ) {
		return tthis.core.delete( 'teams/courses/', courseId )
	}

}
module.exports = TeamService