let serviceCore = require("@modules/core/service")
let firebase = require("@modules/core/firebase")

class TestService extends firebase{
	
	get core() {
		return new serviceCore()
	}

	store () {
		return this.core.storeSet('ranking/')
	}

	delete () {
		return this.core.delete(`ranking/`)
	}

	getSingle () {
		return this.core.getSingle(`ranking/`, '')
	}

	* getRanking () {

		return this.core.getRanking('users', 'status/average')
	}
}

module.exports = TestService