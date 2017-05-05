let serviceCore = require("@modules/core/service")
let firebase = require("@modules/core/firebase")

class  TestService extends firebase{
	
	get core() {
		return new serviceCore()
	}

	store( userKey, courseKey, classKey, testObject) {
		return this.core.storeSet(
			`users/${userKey}/courses/${courseKey}/classes/${classKey}`,
			'test',
			testObject
		)
	}

	update( userKey, courseKey, classKey, testObject ) {
		return this.core.update(
			`users/${userKey}/courses/${courseKey}/classes/${classKey}/`,
			testObject, 'test'
		)
	}

	delete( userKey, courseKey, classKey) {
		return this.core.delete(
			`users/${userKey}/courses/${courseKey}/classes/${classKey}`,
			'test'
		)
	}
}

module.exports = TestService