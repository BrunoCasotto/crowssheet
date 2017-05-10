let serviceCore = require("@modules/core/service")

class  TeamService{

	get core() {
		return new serviceCore()
	}

	create( user, team ) {
		return this.core.store('teams', team)
		.then((response)=>{
			if(response.status) {
				return this.core.storeSet('users/'+user+'/teams', response.data.o[1],team)
			}
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

	update(user, teamId, team) {
		return this.core.update('teams/', team, teamId)
		.then((response)=>{
			return this.core.update( 'users/'+user+'/teams/',team, teamId)
		})
		.catch((error)=>{
			return {
				status: false,
				data: error
			}
		})
	}

	getAll( userId ) {
		return this.core.getAll('users/'+userId+'/teams/')
	}

	getSingle( teamId ) {
		return this.core.getSingle('teams/', teamId)
	}

}
module.exports = TeamService